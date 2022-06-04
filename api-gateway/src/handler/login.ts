import { Response, Request } from 'express'
import LoginInfo from "../model/login"
import Token from '../model/token';
import { generateToken } from '../utils/auth.utils';

const login = (req : Request, res : Response) =>{
    const loginInfo : LoginInfo = req.body

    if(!loginInfo.username || !loginInfo.password){
        // TODO: logar bad request em arquivo
        console.log("Bruh, I need ur name e pass bro")
        return res.status(400).send()
    }

    // TODO: Comparar informações do usuário com o banco de dados
    
    let token = generateToken(loginInfo.username)
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

export default login