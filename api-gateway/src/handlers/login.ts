import { Response, Request } from 'express'
import LoginInfo from "../models/login"
import Token from '../models/token';
import { generateToken } from '../utils/auth.utils';
import { validatePassword } from '../utils/repositories/userRepository'

const login = async (req : Request, res : Response) =>{
    const loginInfo : LoginInfo = req.body

    if(!loginInfo.username || !loginInfo.password){
        // TODO: logar bad request em arquivo
        console.log("Bruh, I need ur name e pass bro")
        return res.status(400).send()
    }

    // Comparar informações do usuário com o banco de dados
    const isLoginOk = await validatePassword(loginInfo.username, loginInfo.password)
    if (!isLoginOk){
        console.log("Usuário ou senha inválidos")
        return res.status(401).send()
    }

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