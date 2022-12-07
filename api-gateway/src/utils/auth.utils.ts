import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { Response } from 'express'
import dotenv from 'dotenv';
import moment from 'moment';
import * as crypto from 'crypto';

dotenv.config()

export function generateToken(username : string) : string | Error{
    const tokenDuration = process.env.TK_DURATION || ""
    const tokenSecretKey = process.env.TK_SECRET_KEY || ""
    const now = moment().local()

    // Validar se as configurações de token existem
    if(tokenSecretKey == "" || tokenDuration == ""){
        // TODO: logar, em arquivo, que precisa validar config de token
        console.log("Couldnt fing your token configuration is strange, please check it and try again")
        return new Error("Couldnt fing your token configuration is strange, please check it and try again")
    }

    try {
        let payload : jwt.JwtPayload = {
            iss : 'datakhu.net',
            sub : username,
            iat : now.valueOf(),
            exp : now.add(tokenDuration, 'm').valueOf()
        }

        const token = jwt.sign(payload,tokenSecretKey, { algorithm : 'HS256' })

        return token
    } catch (error) {
        return error as Error
    }
}

export function verifyToken(token : string) : boolean | Error{
    const tokenSecretKey = process.env.TK_SECRET_KEY || ""

    // Validar se as configurações de token existem
    if(tokenSecretKey == ""){
        // TODO: logar, em arquivo, que precisa validar config de token
        console.log("Couldnt fing your token configuration is strange, please check it and try again")
        return new Error("Couldnt fing your token configuration is strange, please check it and try again")
    }

    try {
        jwt.verify(token, tokenSecretKey)
        return true
    } catch (error) {
        if (error instanceof TokenExpiredError){
            console.log(error.message)
            return false
        }
        if (error instanceof JsonWebTokenError){
            console.log(error.message)
            return false
        }
        return error as Error
    }
}

export function validateBearerToken(bearer: string | undefined, res: Response): undefined | Response{
    if (!bearer) {
        return res.status(401).send()
    }

    const token = bearer.replace("Bearer ", '') as string
    const payload = jwt.decode(token) as jwt.JwtPayload
    if (!payload) {
        console.log("received empty payload")
        return res.status(401).send()
    }

    const isTokenValid = verifyToken(token)
    if (isTokenValid instanceof Error) {
        console.log(isTokenValid.message)
        console.log(isTokenValid.stack)
        return res.status(500).send()
    }

    if (!isTokenValid) {
        return res.status(401).send()
    }

    return
}

export function isSHA256(text:string): boolean {
    const regexExp = /^[a-f0-9]{64}$/gi
    return regexExp.test(text)
}

export function toSHA256(text:string): string{
    return crypto.createHash('sha256').update(text).digest('hex')
}