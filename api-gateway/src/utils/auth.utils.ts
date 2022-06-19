import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import dotenv from 'dotenv';
import moment from 'moment';

dotenv.config()

export function generateToken(username : string) : string | Error{
    const tokenDuration = process.env.TK_DURATION || ""
    const tokenSecretKey = process.env.TK_SECRET_KEY || ""
    const now = moment().local()

    // Validar se as configurações de token existem
    if(tokenSecretKey == "" || tokenDuration == ""){
        // TODO: logar, em arquivo, que precisa validar config de token
        console.log("Ur token config is strange, check it again")
        return new Error("Ur token config is strange, check it again")
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
        console.log("Ur token config is strange, check it again")
        return new Error("Ur token config is strange, check it again")
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