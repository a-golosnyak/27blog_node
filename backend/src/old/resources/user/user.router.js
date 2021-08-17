import { Router } from 'express'
// import { me, updateMe } from './user.controllers'
import * as userController  from './user.controllers'

const router = Router();

router.get('/', userController.me);
router.put('/', userController.updateMe);

export default router
