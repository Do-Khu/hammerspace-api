import express from 'express'
import { login, refresh } from '../handlers/auth.handler'
import { findCardsByName, getCard, listCards } from '../handlers/card.handler'
import { addCardToDeck, createDeck, getDeck, getMyDecks, removeCardFromDeck, updateDeck } from '../handlers/deck.handler'
import { addCardToStorage, findStorageCardsByName, getMyStorage, removeCardFromStorage, reserveCardFromStorage } from '../handlers/storage.handler'
import { listUsers, register } from '../handlers/user.handler'

const router = express.Router()

router.post('/register', register)
router.post('/auth', login)

router.get('/refresh', refresh)
router.get('/users', listUsers)

router.get('/cards', listCards)
router.get('/cards/:id', getCard)
router.get('/cards/:name', findCardsByName)

router.get('/storage', getMyStorage)
router.get('/storage/:name', findStorageCardsByName)
router.get('/storage/:id/remove', removeCardFromStorage)
router.get('/storage/:id/reserve', reserveCardFromStorage)
router.post('/storage', addCardToStorage)

router.get('/decks', getMyDecks)
router.get('/decks/:id', getDeck)
router.get('/decks/:id/:cardid', removeCardFromDeck)
router.post('/decks/:deckid', updateDeck)
router.post('/decks', createDeck)
router.post('/decks/:id', addCardToDeck)

export default router