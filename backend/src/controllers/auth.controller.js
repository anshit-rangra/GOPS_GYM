import userModel from "../models/user.model.js"
import {uploadFile, deleteFile} from "../services/storage.service.js"
import bcrypt from "bcrypt"
import { createAccessToken, createRefreshToken, readRefreshToken } from "../utils/auth.utils.js"

/*
Req.file -->
{
  fieldname: 'profilePic',
  originalname: 'img1.jpeg',
  encoding: '7bit',
  mimetype: 'application/octet-stream',
  buffer: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff db 00 84 00 06 06 06 06 07 06 07 08 08 07 0a 0b 0a 0b 0a 0f 0e 0c 0c 0e 0f 16 10 11 10 ... 339399 more bytes>,
  size: 339449
}

File from ImageKit -->
    {
  fileId: '6abe014eead997d09a7ab0ce',
  name: 'img1_HTF9TjyKa.jpeg',
  size: 339449,
  versionInfo: { id: '6abe014eead997d09a7ab0ce', name: 'Version 1' },
  filePath: '/GOPS_GYM/img1_HTF9TjyKa.jpeg',
  url: 'https://ik.imagekit.io/4ytu59yld/GOPS_GYM/img1_HTF9TjyKa.jpeg',
  fileType: 'image',
  height: 1600,
  width: 1600,
  thumbnailUrl: 'https://ik.imagekit.io/4ytu59yld/tr:n-ik_ml_thumbnail/GOPS_GYM/img1_HTF9TjyKa.jpeg',
  AITags: null,
  description: null
}
*/

async function registerUser(req, res) {

    const { name, age, phoneNumber, password } = req.body

    if(!req.file) return res.status(404).json({ message: "Profile Photo not found" })

    const userExist = await userModel.findOne({ phoneNumber })

    if(userExist) return res.status(409).json({message: "User already exists"})

    const hashedPassword = await bcrypt.hash(password, 10)

    const uploadedFile = await uploadFile({ buffer: req.file.buffer, fileName:req.file.originalname})


    const uploadedProfilePic = { url: uploadedFile.url, picId: uploadedFile.fileId }
    const newUser = await userModel.create({ name, age, phoneNumber, profilePic: uploadedProfilePic, password: hashedPassword })

    res.status(201).json({message: "User Request sent sucessfully !", data: {
        user: newUser
    } })
}

async function loginUser(req, res){

    const { phoneNumber, password } = req.body;

    const userExists = await userModel.findOne({ phoneNumber })

    if(!userExists) return res.status(404).json({message:"User not found"})

    if(userExists.isAuthorized === false) return res.status(401).json({ message:"User registered but not approved, Talk to admin" })

    const comparePassword = await bcrypt.compare(password, userExists.password)

    if(!comparePassword) return res.status(401).json({ message: "Invalid Credentails !" })

    const refreshToken = createRefreshToken({ userId:userExists._id, role:userExists.role, isAuthorized:userExists.isAuthorized })

    userExists.refreshToken = refreshToken
    await userExists.save();

    res.cookie("refreshToken", refreshToken, { httpOnly: true })

    const accessToken = createAccessToken({ userId:userExists._id, role:userExists.role, isAuthorized:userExists.isAuthorized })


    res.status(200).json({ message: "User Logged In !", data: {
        user: userExists,
        accessToken: accessToken
    } })

}

async function getAccessToken(req, res){
    const refreshToken = req.cookies?.refreshToken

    if (!refreshToken) {
    return res.status(401).json({
        message: "Refresh token required"
    })
}

    try {
        const decodedData = readRefreshToken(refreshToken)
        const user = await userModel.findOne({ _id: decodedData.userId })

        if(!user) return res.status(401).json({ message: "Invalid Refresh Token" })
        
        if(user.refreshToken !== refreshToken) return res.status(403).json({message:"Refresh Token mismatch"})

        const newRefreshToken = createRefreshToken({ userId:user._id, role:user.role, isAuthorized:user.isAuthorized })
        const newAccessToken = createAccessToken({ userId:user._id, role: user.role, isAuthorized:user.isAuthorized })

        res.cookie("refreshToken", newRefreshToken, { httpOnly: true })

        user.refreshToken = newRefreshToken
        await user.save();

        res.status(200).json({message:"Access token generated successfully" , data:{
            accessToken: newAccessToken
        }})

    } catch (error) {
        return res.status(401).json({message: "Invalid refresh token"})
    }
    
}

async function getMe(req, res){

    const { userId } = req.user;

    const user = await userModel.findOne({ _id:userId })

    if(!user) res.status(404).json({ message:"User Not Found" })

    res.status(200).json({message:"User get successfully", data:{
        user 
    }})

}

async function deleteMyAccount(req, res){
    const { userId } = req.user;

    const user = await userModel.findOne({ _id:userId })

    if(!user) return res.status(200).json({message:"User Already deleted"})

    await deleteFile(user.profilePic.picId)
    
    await userModel.findOneAndDelete({ _id: userId })

    res.status(200).json({ message:"User Delete Sucessfully" })

}

export default {
    registerUser,
    loginUser,
    getMe,
    getAccessToken,
    deleteMyAccount
}