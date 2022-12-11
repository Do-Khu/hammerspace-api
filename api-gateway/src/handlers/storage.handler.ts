import { Response, Request } from 'express'
import { validateBearerToken } from '../utils/auth.utils'
import { CardUtil } from '../utils/card.utils'
import { UserRepository } from '../utils/repositories/userRepository'

const userRepository = new UserRepository()
const cardUtil = new CardUtil()

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
    // eu odeio o typeorm
    console.log(JSON.parse(JSON.stringify(currentUser))[0].id)
    const userId = JSON.parse(JSON.stringify(currentUser))[0].id
    console.log(userId)
    const url = (process.env.STORAGE_SERVICE || 'http://localhost:9252') + 'api/storage/' + userId
    const result = await fetch(url, {
        method: 'GET'
    })

    if(!result.ok && result.status != 200){
        return res.status(result.status).send()
    }
    
    const storageList = (await result.json()) as StorageCardResult[]
    let list: StorageCardDto[] = []

    for (let i = 0; i < storageList.length; i++) {
        const c = storageList[i]
        const card = await cardUtil.fetchCardInfo(c.cardid)
        if(!card)
            return res.status(404).send("card not found")

        list.push({
            id: c.id,
            cardId: c.cardid,
            cardName: c.cardname,
            colorIdentity: c.coloridentity,
            imgLink: card.imglink,
            deckId: c.deckid,
            isReserved: c.isreserved
        })
    };

    return res.status(200).send(list)
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
    
    const userId = JSON.parse(JSON.stringify(currentUser))[0].id
    console.log(userId)
    const url = (process.env.STORAGE_SERVICE || 'http://localhost:9252') + 'api/storage/' + userId 
                + '/' + storageId + '/remove'

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
    
    const userId = JSON.parse(JSON.stringify(currentUser))[0].id
    console.log("userid:" + userId)
    const url = (process.env.STORAGE_SERVICE || 'http://localhost:9252') + 'api/storage/' + userId
                + '/' + storageId + '/reserve'
    const result = await fetch(url, {
        method: 'GET'
    })

    if(!result.ok && result.status != 200){
        return res.status(result.status).send()
    }
    
    const storageList = (await result.json())
    return res.status(200).send(storageList)
}

export const findStorageCardsByName = async(req: Request, res: Response) =>{
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
    const userId = JSON.parse(JSON.stringify(currentUser))[0].id
    console.log(userId)
    const url = (process.env.STORAGE_SERVICE || 'http://localhost:9252') + 'api/storage/' + userId 
               + '/' + cardname
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
    const cardInfo: AddCardDto = req.body

    const validateResult = await validateBearerToken(token, res)
    if (validateResult instanceof Response) {
        return validateResult
    }

    if (!cardInfo.cardId) {
        console.log("Please, inform the cardId to add a new card to your storage")
        return res.status(400).send()
    }

    const currentUser = await userRepository.getUserFromUsername(validateResult as string)
    if(currentUser instanceof Error){
        console.log(currentUser)
        return res.status(500).send()
    }
    
    const userId = JSON.parse(JSON.stringify(currentUser))[0].id
    console.log(userId)
    const card = await cardUtil.fetchCardInfo(cardInfo.cardId)
    if(!card)
        return res.status(404).send("card not found")

    const input: StorageCardInput = {
        cardId: cardInfo.cardId,
        cardname: card.cardname,
        coloridentity: card.coloridentity
    }

    const url = (process.env.STORAGE_SERVICE || 'http://localhost:9252') + 'api/storage/' + userId
    const result = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(input)
    })

    if(!result.ok && result.status != 200){
        return res.status(result.status).send()
    }
    
    return res.status(201).send()
}