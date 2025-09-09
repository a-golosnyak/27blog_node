import * as express from "express";
import { requireAuth } from '../middleware/auth';

const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


export default router;
