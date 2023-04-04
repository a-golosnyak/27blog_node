import "reflect-metadata";
import express from "express";
import logger from 'morgan';
import usersRouter from './routes/users';
import postsRouter from './routes/posts';
import {AuthService} from "./services/AuthService"
import bodyParser from "body-parser"
import {AuthController} from "./controllers/AuthController";
import RegisterRequest from "./request/Auth/RegisterRequest";
import {AppDataSource} from "./AppDataSource";

export const app = express();
export let server;

app.use(logger('dev'));
// app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  return res.status(200).send({ message: 'Welcome to the contacts API!' });
});

app.post('/register', RegisterRequest.validate, AuthController.register);
app.post('/login', RegisterRequest.validate, AuthController.login);

app.use('/api', async (req, res, next) => {
  next()
})

app.use('/', AuthService.protect);

app.use('/api/user', usersRouter);
app.use('/api/post', postsRouter);
// app.use(errorHandler);

const start = async () => {
  try {
    console.log("--- Here env ------------------------");
    console.log(process.env.NODE_ENV);
    console.log(process.env.APP_PORT);
    console.log(process.env.MONGO_CONNECTION_STRING);
    // console.log(ormconfig);
    console.log("------------------------------------");

    await AppDataSource.initialize()
      .then(() => {
        console.log('Data Source has been initialized!');
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });

    // const myDataSource = new DataSource(ormconfig)
    // await myDataSource.connect();

    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // console.log('1 user');
    // user.firstName = faker.name.firstName();
    // user.lastName = faker.name.lastName();
    // user.email = faker.internet.email(user.firstName, user.lastName);
    // user.age = faker.datatype.number({min: 10, max: 60});
    // await user.save();
    // await connection.manager.save(user);
    // console.log('2 save');
    // console.log("Saved a new user with id: " + user.id);
    // console.log("Loading users from the database...");
    // const users = await User.find();
    // console.log("Loaded users: ", users);
    // console.log("Here you can setup and run express/koa/any other framework.");

  } catch (e) {
    console.log(e);
  }

  server = await app.listen(process.env.APP_PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${process.env.APP_PORT}`
    );
  })
}

start()
  .catch(err => console.log(err));


function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

module.exports = app;
module.exports = server;
