import express from 'express'
import { login, refresh } from '../handlers/auth.handler'
import { findCardsByName, getCard, listCards } from '../handlers/card.handler'
import { listUsers, register } from '../handlers/user.handler'

const router = express.Router()

router.post('/register', register)
router.post('/auth', login)

router.get('/refresh', refresh)
router.get('/users', listUsers)

router.get('/cards', listCards)
router.get('/cards/:id', getCard)
router.get('/cards/:name', findCardsByName)

export default router