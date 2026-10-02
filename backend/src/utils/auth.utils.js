import jwt from "jsonwebtoken"
import ENV from "../config/config.js"

export function createAccessToken({ userId, role, isAuthorized }){
    const accessToken = jwt.sign({
         userId, role, isAuthorized
        }, ENV.ACCESS_TOKEN_SECRET,
    {
        expiresIn:"15Min"
    })

    return accessToken;
}

export function readAccessToken(accessToken){
    return jwt.verify(accessToken, ENV.ACCESS_TOKEN_SECRET)
}

export function createRefreshToken({userId, role, isAuthorized}){
    const refreshToken = jwt.sign({
        userId, role , isAuthorized
    }, ENV.REFRESH_TOKEN_SECRET,
{
    expiresIn:"7Days"
})
return refreshToken
}

export function readRefreshToken(refreshToken){
    return jwt.verify(refreshToken, ENV.REFRESH_TOKEN_SECRET)
}