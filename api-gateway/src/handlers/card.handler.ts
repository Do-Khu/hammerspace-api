import { Response, Request } from 'express'
import { validateBearerToken } from '../utils/auth.utils'

export const findCardsByName = async(req: Request, res: Response) =>{
    console.log("GET api/cards/:name")
    let token: string | Error | undefined = req.headers.authorization

    const validateResult = validateBearerToken(token, res)
    if (validateResult) {
        return validateResult
    }

    const cardName = req.query.name || ''
    if(typeof cardName !== "string" || cardName == ''){
        console.log("couldn't get name param value")
        return res.status(400).send("couldn't get name param value")
    }

    const url = (process.env.CARD_SERVICE || 'http://localhost:9252') + 'api/cards/' + cardName
    const result = await fetch(url, {
        method: 'GET'
    })

    if(!result.ok && result.status != 200){
        return res.status(result.status).send()
    }

    const card = (await result.json()) as CardDto
    res.status(200).send(card)
}

export const listCards = async(req: Request, res: Response) =>{
    console.log("GET api/cards")
    let token: string | Error | undefined = req.headers.authorization

    const validateResult = validateBearerToken(token, res)
    if (validateResult) {
        return validateResult
    }

    const url = (process.env.CARD_SERVICE || 'http://localhost:9252') + 'api/cards/'
    const result = await fetch(url, {
        method: 'GET'
    })

    if(!result.ok && result.status != 200){
        return res.status(result.status).send()
    }

    const list = (await result.json()) as CardDto[]
    res.status(200).send(list)
}

export const getCard = async(req: Request, res: Response) =>{
    console.log("GET api/cards/:id")
    let token: string | Error | undefined = req.headers.authorization

    const validateResult = validateBearerToken(token, res)
    if (validateResult) {
        return validateResult
    }

    const id = req.query.id || ''
    if(typeof id !== "string" || id === ''){
        console.log("couldn't get id param value")
        return res.status(400).send("couldn't get id param value")
    }

    const url = (process.env.CARD_SERVICE || 'http://localhost:9252') + 'api/cards/' + id
    const result = await fetch(url, {
        method: 'GET'
    })

    if(!result.ok && result.status != 200){
        return res.status(result.status).send()
    }

    const card = (await result.json()) as CardDto
    res.status(200).send(card)
}