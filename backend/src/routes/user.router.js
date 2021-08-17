import { Router } from 'express'
import { me, updateMe } from '.././controllers/user.controllers'

const router = Router()

router.get('/', me)
router.put('/', updateMe)

export default router
