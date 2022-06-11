import express from 'express'
import login from '../handlers/login'
import refresh from '../handlers/refresh'

const router = express.Router()

router.post('/auth', login)
router.get('/refresh', refresh)

export default router