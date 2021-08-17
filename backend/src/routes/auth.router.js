import { Router } from 'express'
import * as authController from '.././controllers/auth.controller'

const router = Router();

router.get('/', authController.signin);
router.put('/', authController.signup);

export default router
