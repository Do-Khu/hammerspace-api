import { Response, Request } from 'express'
import RegisterUser from '../models/registerUser.dto'
import { isSHA256, toSHA256, verifyToken } from '../utils/auth.utils'
// import { create, getAll } from '../utils/repositories/userRepository'
import { UserRepository } from '../utils/repositories/userRepository'
import jwt from 'jsonwebtoken'

const userRepository = new UserRepository()

export const register = async (req: Request, res: Response) => {
    console.log("POST api/register")
    const registerInfo: RegisterUser = req.body

    if (!registerInfo.username || !registerInfo.password || !registerInfo.fullName) {
        console.log("Please, inform the username, password and fullName to register a new user")
        return res.status(400).send()
    }

    // Garantindo que senha esteja em SHA256
    if (!isSHA256(registerInfo.password)) {
        console.log("pwd: " + registerInfo.password)
        registerInfo.password = toSHA256(registerInfo.password)
        console.log("SHA256(pwd): " + registerInfo.password)
    }

    const err = userRepository.create(registerInfo.username, registerInfo.password, registerInfo.fullName)
    if (err != null && err instanceof Error) {
        console.log("error on user creation: " + err.message)
        console.log(err.stack)
        return res.status(500).send()
    }

    return res.status(201).send()
}

export const listUsers = async (req: Request, res: Response) => {
    console.log("GET api/users")
    // TODO: generalizar validação do token
    let token: string | Error | undefined = req.headers.authorization

    if (!token) {
        return res.status(401).end()
    }

    const payload = jwt.decode(token.replace("Bearer ", '') as string) as jwt.JwtPayload

    if (!payload) {
        console.log("received empty payload")
        return res.status(400).end()
    }

    const isTokenValid = verifyToken(token.replace("Bearer ", '') as string)
    if (isTokenValid instanceof Error) {
        console.log(isTokenValid.message)
        console.log(isTokenValid.stack)
        return res.status(500).end()
    }
    if (!isTokenValid) {
        return res.status(401).end()
    }

    const users = await userRepository.getAll()
    if (users instanceof Error) {
        console.log("error on listing users: " + users.message)
        console.log(users.stack)
        return res.status(500).send()
    }

    return res.status(200).send(users)
}