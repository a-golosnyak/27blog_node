import "reflect-metadata";
import express, {NextFunction, Request, Response} from "express";
import logger from 'morgan';
import usersRouter from './routes/users';
import postsRouter from './routes/posts';
import bodyParser from "body-parser"
import { AuthController } from "./controllers/AuthController";
import RegisterRequest from "./request/Auth/RegisterRequest";
import { AppError } from "./utils/AppError";
import { AuthService } from "./services/AuthService";

export const app = express();

// app.use(logger('Logger test'));
// app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  return res.status(200).send({ message: 'Welcome to the contacts API! ' });
});


app.post('/signup', RegisterRequest.validate, AuthController.register);
app.post('/login', RegisterRequest.validate, AuthController.login);

// app.use('/api', async (req: Req, res, next) => {
//   next()
// })

// app.use('/', AuthService.protect);

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

app.use(errorHandler);

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.log('--- Here errorHandler ------');
  const status = (err instanceof AppError) ? err.status : 500;

  res.status(status).json({ message: err.message || 'Internal error' });
}

export default app;
