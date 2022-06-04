import express from 'express'
import login from '../handler/login'
import refresh from '../handler/refresh'

const router = express.Router()

router.post('/auth', login)
router.get('/refresh', refresh)

export default router