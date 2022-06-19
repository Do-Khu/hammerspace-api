import { Response, Request } from 'express'
import RegisterUser from '../models/registerUser.dto'
import { isSHA256, toSHA256 } from '../utils/auth.utils'
import { create } from '../utils/repositories/userRepository'

const register = async (req : Request, res : Response) =>{
    console.log("POST api/register")
    const registerInfo : RegisterUser = req.body

    if(!registerInfo.username || !registerInfo.password || !registerInfo.fullName){
        console.log("Please, inform the username, password and fullName to register a new user")
        return res.status(400).send()
    }

    // Garantindo que senha esteja em SHA256
    if(!isSHA256(registerInfo.password)){
        console.log("pwd: " + registerInfo.password)
        registerInfo.password = toSHA256(registerInfo.password)
        console.log("SHA256(pwd): " + registerInfo.password)
    }
    
    const err = create(registerInfo.username, registerInfo.password, registerInfo.fullName)
    if (err != null){
        console.log("error on user creation: " + err)
        return res.status(500).send()
    }
    
    return res.status(201).send()
}

export default register