import { Response, Request } from 'express'
import { validateBearerToken } from '../utils/auth.utils'
import { CardUtil } from '../utils/card.utils'
import { UserRepository } from '../utils/repositories/userRepository'

const userRepository = new UserRepository()
const cardUtil = new CardUtil()

export const getMyDecks = async(req: Request, res: Response) =>{
    console.log("GET api/decks")
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
    const url = (process.env.STORAGE_SERVICE || 'http://localhost:9352') + 'api/decks/' + JSON.parse(JSON.stringify(currentUser))[0].id
    const result = await fetch(url, {
        method: 'GET'
    })

    if(!result.ok && result.status != 200){
        return res.status(result.status).send()
    }
    
    const deckList = (await result.json())
    return res.status(200).send(deckList)
}

export const getDeck = async(req: Request, res: Response) =>{
    console.log("GET api/decks/:id")
    let token: string | Error | undefined = req.headers.authorization

    // validar token
    const validateResult = await validateBearerToken(token, res)
    if (validateResult instanceof Response) {
        return validateResult
    }

    const deckId = req.params.id || ''
    if(typeof deckId !== "string" || deckId == ''){
        console.log("couldn't get deckId param value")
        return res.status(400).send("couldn't get deckId param value")
    }

    // recuperar usuário baseado na sessão atual
    const currentUser = await userRepository.getUserFromUsername(validateResult as string)
    if(currentUser instanceof Error){
        console.log(currentUser)
        return res.status(500).send()
    }

    // recuperar dados do deck
    const url = (process.env.STORAGE_SERVICE || 'http://localhost:9352') + 'api/decks/' + JSON.parse(JSON.stringify(currentUser))[0].id
             + '/' + deckId
    const result = await fetch(url, {
        method: 'GET'
    })

    if(!result.ok && result.status != 200){
        return res.status(result.status).send()
    }
    
    // recuperar imagem do card comunicando com o card service
    const deckResult = (await result.json()) as GetDeckResult
    let deck: DeckDto = {
        cardname: deckResult.cardname,
        coloridentity: deckResult.coloridentity,
        deckname: deckResult.deckname,
        commandercardid: deckResult.commandercardid,
        ownedCards: deckResult.ownedCards,
        totalcards: deckResult.totalcards,
        id: deckResult.id,
        cards: []
    }

    for (let i = 0; i < deck.cards.length; i++) {
        const c = deck.cards[i]
        const card = await cardUtil.fetchCardInfo(c.cardid)
        if(!card)
            return res.status(404).send("card not found")

        deck.cards.push({
            cardid: c.cardid,
            cardName: c.cardName,
            colorIdentity: c.colorIdentity,
            imglink: JSON.parse(JSON.stringify(card))[0].imglink,
            amount: c.amount,
            reservedStorageAmount: c.reservedStorageAmount,
            storageAmount: c.storageAmount
        })
    };

    return res.status(200).send(deckResult)
}

export const removeCardFromDeck = async(req: Request, res: Response) =>{
    console.log("GET api/decks/:id/:cardid")
    let token: string | Error | undefined = req.headers.authorization

    const validateResult = await validateBearerToken(token, res)
    if (validateResult instanceof Response) {
        return validateResult
    }

    const deckId = req.params.id || ''
    if(typeof deckId !== "string" || deckId == ''){
        console.log("couldn't get storageid param value")
        return res.status(400).send("couldn't get storageid param value")
    }

    const cardid = req.params.cardid || ''
    if(typeof cardid !== "string" || cardid == ''){
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
    const url = (process.env.STORAGE_SERVICE || 'http://localhost:9352') + 'api/decks/' + userId
                + '/' + deckId + '/' + cardid
    const result = await fetch(url, {
        method: 'GET'
    })

    if(!result.ok && result.status != 200){
        return res.status(result.status).send()
    }
    
    const deck = (await result.json())
    return res.status(200).send(deck)
}

export const createDeck = async(req: Request, res: Response) =>{
    console.log("POST api/decks")
    let token: string | Error | undefined = req.headers.authorization
    const deckInfo: CreateDeckDto = req.body
    

    const validateResult = await validateBearerToken(token, res)
    if (validateResult instanceof Response) {
        return validateResult
    }

    if (!deckInfo.commanderCardId || !deckInfo.deckName) {
        console.log("Please, inform the cardId and deckname to add a new deck to your storage")
        return res.status(400).send()
    }

    const currentUser = await userRepository.getUserFromUsername(validateResult as string)
    if(currentUser instanceof Error){
        console.log(currentUser)
        return res.status(500).send()
    }
    const userId = JSON.parse(JSON.stringify(currentUser))[0].id
    console.log(userId)

    const card = await cardUtil.fetchCardInfo(deckInfo.commanderCardId)
    if(!card)
        return res.status(404).send("card not found")

    const input: DeckInput = {
        cardName: JSON.parse(JSON.stringify(card))[0].cardname,
        colorIdentity: JSON.parse(JSON.stringify(card))[0].coloridentity,
        commanderCardId: deckInfo.commanderCardId,
        deckName: deckInfo.deckName
    }

    const url = (process.env.STORAGE_SERVICE || 'http://localhost:9352') + 'api/decks'
    const result = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            userId: userId,
            deckName: input.deckName,
            commanderCardId: input.commanderCardId,
            cardName: input.cardName,
            colorIdentity: input.colorIdentity
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(!result.ok && result.status != 200){
        return res.status(result.status).send()
    }
    
    return res.status(200).send()
}

export const updateDeck = async(req: Request, res: Response) =>{
    console.log("POST api/decks/:deckid")
    let token: string | Error | undefined = req.headers.authorization
    const deckInfo: CreateDeckDto = req.body

    const validateResult = await validateBearerToken(token, res)
    if (validateResult instanceof Response) {
        return validateResult
    }

    if (!deckInfo.commanderCardId || !deckInfo.deckName) {
        console.log("Please, inform the cardId, cardname, deckname and coloridentity to add a new deck to your storage")
        return res.status(400).send()
    }

    const deckId = req.params.deckid || ''
    if(typeof deckId !== "string" || deckId == ''){
        console.log("couldn't get deckId param value")
        return res.status(400).send("couldn't get deckId param value")
    }

    const currentUser = await userRepository.getUserFromUsername(validateResult as string)
    if(currentUser instanceof Error){
        console.log(currentUser)
        return res.status(500).send()
    }
    
    const userId = JSON.parse(JSON.stringify(currentUser))[0].id
    console.log(userId)
    const card = await cardUtil.fetchCardInfo(deckInfo.commanderCardId)
    if(!card)
        return res.status(404).send("card not found")
        
    const input: DeckInput = {
        cardName: JSON.parse(JSON.stringify(card))[0].cardname,
        colorIdentity: JSON.parse(JSON.stringify(card))[0].coloridentity,
        commanderCardId: deckInfo.commanderCardId,
        deckName: deckInfo.deckName
    }

    const url = (process.env.STORAGE_SERVICE || 'http://localhost:9352') + 'api/decks/' + deckId
    const result = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            userId: currentUser.id,
            deckName: input.deckName,
            commanderCardId: input.commanderCardId,
            cardName: input.cardName,
            colorIdentity: input.colorIdentity
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(!result.ok && result.status != 200){
        return res.status(result.status).send()
    }
    
    return res.status(200).send()
}

export const addCardToDeck = async(req: Request, res: Response) =>{
    console.log("POST api/decks/:id")
    let token: string | Error | undefined = req.headers.authorization
    const cardInfo: AddCardDto = req.body

    const validateResult = await validateBearerToken(token, res)
    if (validateResult instanceof Response) {
        return validateResult
    }

    if (!cardInfo.cardId) {
        console.log("Please, inform the cardId to add a new card to your deck")
        return res.status(400).send()
    }

    const deckId = req.params.id || ''
    if(typeof deckId !== "string" || deckId == ''){
        console.log("couldn't get deckId param value")
        return res.status(400).send("couldn't get deckId param value")
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

    const input:DeckCardInput = {
        cardId: JSON.parse(JSON.stringify(card))[0].id,
        cardName: JSON.parse(JSON.stringify(card))[0].cardname,
        coloridentity: JSON.parse(JSON.stringify(card))[0].coloridentity
    }

    const url = (process.env.STORAGE_SERVICE || 'http://localhost:9352') + 'api/decks/' + deckId
    const result = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(input),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(!result.ok && result.status != 200){
        return res.status(result.status).send()
    }
    
    return res.status(200).send()
}