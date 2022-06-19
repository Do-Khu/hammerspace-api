import express from 'express'
import { login, refresh } from '../handlers/auth.handler'
import { listUsers, register } from '../handlers/user.handler'

const router = express.Router()

router.post('/register', register)
router.post('/auth', login)

router.get('/refresh', refresh)
router.get('/users', listUsers)

export default router