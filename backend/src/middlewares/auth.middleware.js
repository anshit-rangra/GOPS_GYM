import { readAccessToken } from "../utils/auth.utils.js"


export async function authUserMiddleware(req, res, next){
    const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null

    if(!token) return res.status(404).json({ message: "Access Token not found" })
    
    try {
        const decodeJWT = readAccessToken(token)

        if(!decodeJWT.isAuthorized) return res.status(401).json({message:"User is unauthorized"})

        req.user = decodeJWT
    } catch (error) {
        return res.status(401).json({ message:"Access Token expired" })
    }

    next()
    
}

export async function authAdminMiddleware(req, res, next){
    const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null

    if(!token) return res.status(404).json({ message: "Access Token not found" })
    
    try {
        const decodeJWT = readAccessToken(token)

        if(decodeJWT.role !== 'admin') return res.status(401).json({ message: "Only Admin access"})

        req.user = decodeJWT
    } catch (error) {
        return res.status(401).json({ message:"Access Token expired" })
    }

    next()
    
}