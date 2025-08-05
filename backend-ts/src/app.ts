import "reflect-metadata";
import express, {NextFunction, Request, Response} from "express";
import logger from 'morgan';
import usersRouter from './routes/users';
import postsRouter from './routes/posts';
import { AuthService } from "./services/AuthService"
import bodyParser from "body-parser"
import { AuthController } from "./controllers/AuthController";
import RegisterRequest from "./request/Auth/RegisterRequest";
import { AppDataSource } from "./AppDataSource";
import { AppError } from "./utils/AppError";
import config from "./config";

export const app = express();
export let server;

app.use(logger('Logger test'));
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


const start = async () => {
  try {
    console.log("--- Here process.env ------------------------");
    console.log(process.env.NODE_ENV);
    console.log(process.env.APP_PORT);
    console.log(process.env.MONGO_CONNECTION_STRING);
    // console.log(ormconfig);
    console.log("--- Here config.env ------------------------");
    console.log('APP_PORT', config.APP_URL);
    console.log("------------------------------------");

    await AppDataSource.initialize()
      .then(() => {
        console.log('Data Source has been initialized!');
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });
  } catch (e) {
    console.log(e);
  }
  server = app.listen(config.APP_PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${config.APP_PORT}`
    );
  })
}

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.log('--- Here errorHandler ------');
  const status = (err instanceof AppError) ? err.status : 500;

  res.status(status).json({ message: err.message || 'Internal error' });
  // res.render('error', { error: err });
}

start()
  .catch(err => {
    console.log(err)
  });


module.exports = app;
module.exports = server;
