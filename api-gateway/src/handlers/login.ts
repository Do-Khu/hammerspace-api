import { Response, Request } from 'express'
import LoginInfo from "../models/loginInfo.dto"
import Token from '../models/token.dto';
import { generateToken, isSHA256, toSHA256 } from '../utils/auth.utils';
import { validatePassword } from '../utils/repositories/userRepository'

const login = async (req : Request, res : Response) =>{
    const loginInfo : LoginInfo = req.body

    if(!loginInfo.username || !loginInfo.password){
        // TODO: logar bad request em arquivo
        console.log("Bruh, I need ur name e pass bro")
        return res.status(400).send()
    }

    // Garantindo que senha esteja em SHA256
    if(!isSHA256(loginInfo.password)){
        console.log("pwd: " + loginInfo.password)
        loginInfo.password = toSHA256(loginInfo.password)
        console.log("SHA256(pwd): " + loginInfo.password)
    }

    // Comparar informações do usuário com o banco de dados
    const isLoginOk = await validatePassword(loginInfo.username, loginInfo.password)
    if(isLoginOk instanceof Error){
        // TODO: logar erro em arquivo
        console.log("An error happened while trying to validate user info.")
        console.log(isLoginOk.message)
        console.log(isLoginOk.stack)
        return res.status(500).send()
    }
    if (!isLoginOk){
        console.log("Usuário ou senha inválidos")
        return res.status(401).send()
    }

    const token = generateToken(loginInfo.username)
    if(token instanceof Error){
        // TODO: logar erro em arquivo
        console.log(token.message)
        console.log(token.stack)
        return res.status(500).send()
    }

    const respBody : Token = {
        token: token
    }

    return res.status(200).send(respBody)
}

export default login