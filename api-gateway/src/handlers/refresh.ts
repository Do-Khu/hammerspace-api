import { Response, Request } from 'express'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import Token from '../models/token'
import { generateToken, verifyToken } from '../utils/auth.utils'

const refresh = (req : Request, res: Response) => {
    let token : string | Error | undefined = req.headers.authorization

    if(!token){
        return res.status(401).end()
    }
    console.log("token recebido: " + token)
    const payload = jwt.decode(token.replace("Bearer ", '') as string) as jwt.JwtPayload
    console.log("payload sub: " + payload.sub)
    console.log("payload exp: " + moment(payload.exp).toLocaleString())

    if(!payload){
        console.log("veio vazio")
    }

    const isTokenValid = verifyToken(token.replace("Bearer ", '') as string)
    if(isTokenValid instanceof Error){
        console.log(isTokenValid.message)
        console.log(isTokenValid.stack)
        res.status(500).end()
    }
    if(!isTokenValid){
        res.status(401).end()
    }

    if(!payload.sub)
        return res.status(401).end()
    
    token = generateToken(payload.sub)
    if(token instanceof Error){
        // TODO: logar erro em arquivo
        console.log(token.message)
        console.log(token.stack)
        return res.status(500).send(token)
    }

    const respBody : Token = {
        token: token
    }

    return res.status(200).send(respBody)

}

export default refresh