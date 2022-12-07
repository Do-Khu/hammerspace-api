import { Response, Request } from 'express'
import { validateBearerToken } from '../utils/auth.utils'
import { UserRepository } from '../utils/repositories/userRepository'

const userRepository = new UserRepository()

export const getMyStorage = async(req: Request, res: Response) =>{
    console.log("GET api/storage")
    let token: string | Error | undefined = req.headers.authorization

    const validateResult = await validateBearerToken(token, res)
    if (validateResult instanceof Response) {
        return validateResult
    }

    const currentUser = await userRepository.getUserFromUsername(validateResult as string)
    if(currentUser instanceof Error){
        console.log(currentUser)
        return res.status(500).send()
    }
    const url = (process.env.CARD_SERVICE || 'http://localhost:9252') + 'api/storage/' + currentUser.id
    const result = await fetch(url, {
        method: 'GET'
    })

    if(!result.ok && result.status != 200){
        return res.status(result.status).send()
    }
    
    const storageList = (await result.json())
    return res.status(200).send(storageList)
}

export const removeCardFromStorage = async(req: Request, res: Response) =>{
    console.log("GET api/storage/:id/remove")
    let token: string | Error | undefined = req.headers.authorization

    const validateResult = await validateBearerToken(token, res)
    if (validateResult instanceof Response) {
        return validateResult
    }

    const storageId = req.query.id || ''
    if(typeof storageId !== "string" || storageId == ''){
        console.log("couldn't get storageid param value")
        return res.status(400).send("couldn't get storageid param value")
    }

    const currentUser = await userRepository.getUserFromUsername(validateResult as string)
    if(currentUser instanceof Error){
        console.log(currentUser)
        return res.status(500).send()
    }
    const url = (process.env.CARD_SERVICE || 'http://localhost:9252') + 'api/storage/' 
                + currentUser.id + '/' + storageId + '/remove'
    const result = await fetch(url, {
        method: 'GET'
    })

    if(!result.ok && result.status != 200){
        return res.status(result.status).send()
    }
    
    return res.status(200).send()
}

export const reserveCardFromStorage = async(req: Request, res: Response) =>{
    console.log("GET api/storage/:id/reserve")
    let token: string | Error | undefined = req.headers.authorization

    const validateResult = await validateBearerToken(token, res)
    if (validateResult instanceof Response) {
        return validateResult
    }

    const storageId = req.query.id || ''
    if(typeof storageId !== "string" || storageId == ''){
        console.log("couldn't get storageid param value")
        return res.status(400).send("couldn't get storageid param value")
    }

    const currentUser = await userRepository.getUserFromUsername(validateResult as string)
    if(currentUser instanceof Error){
        console.log(currentUser)
        return res.status(500).send()
    }
    const url = (process.env.CARD_SERVICE || 'http://localhost:9252') + 'api/storage/' 
                + currentUser.id + '/' + storageId + '/reserve'
    const result = await fetch(url, {
        method: 'GET'
    })

    if(!result.ok && result.status != 200){
        return res.status(result.status).send()
    }
    
    const storageList = (await result.json())
    return res.status(200).send(storageList)
}

export const findCardsByName = async(req: Request, res: Response) =>{
    console.log("GET api/storage/:name")
    let token: string | Error | undefined = req.headers.authorization

    const validateResult = await validateBearerToken(token, res)
    if (validateResult instanceof Response) {
        return validateResult
    }

    const cardname = req.query.id || ''
    if(typeof cardname !== "string" || cardname == ''){
        console.log("couldn't get cardname param value")
        return res.status(400).send("couldn't get cardname param value")
    }

    const currentUser = await userRepository.getUserFromUsername(validateResult as string)
    if(currentUser instanceof Error){
        console.log(currentUser)
        return res.status(500).send()
    }
    const url = (process.env.CARD_SERVICE || 'http://localhost:9252') + 'api/storage/' 
                + currentUser.id + '/' + cardname
    const result = await fetch(url, {
        method: 'GET'
    })

    if(!result.ok && result.status != 200){
        return res.status(result.status).send()
    }
    
    const card = (await result.json())
    return res.status(200).send(card)
}

export const addCardToStorage = async(req: Request, res: Response) =>{
    console.log("POST api/storage")
    let token: string | Error | undefined = req.headers.authorization
    const cardInfo: StorageCardInput = req.body

    const validateResult = await validateBearerToken(token, res)
    if (validateResult instanceof Response) {
        return validateResult
    }

    if (!cardInfo.cardId || !cardInfo.cardname || !cardInfo.coloridentity) {
        console.log("Please, inform the cardId, cardname and coloridentity to add a new card to your storage")
        return res.status(400).send()
    }

    const currentUser = await userRepository.getUserFromUsername(validateResult as string)
    if(currentUser instanceof Error){
        console.log(currentUser)
        return res.status(500).send()
    }
    const url = (process.env.CARD_SERVICE || 'http://localhost:9252') + 'api/storage/' + currentUser.id
    const result = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(cardInfo)
    })

    if(!result.ok && result.status != 200){
        return res.status(result.status).send()
    }
    
    return res.status(201).send()
}