import "reflect-metadata";
import express from "express";
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import faker from '@faker-js/faker';
import { createConnection, getConnectionOptions } from "typeorm";
import usersRouter from './routes/users';
import postsRouter from './routes/posts';
import {User} from "./database/models/User";
import {fakeProtect, protect} from "./utils/auth";

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', async (req, res) => {
  return res.status(200).send({ message: 'Welcome to the contacts API! ' });
});

app.post('/register', (req, res) => {
  console.log('Here 1')
  res.status(200).send({message: 'Request received'});
});
// app.post('/login', signin);

app.use('/api', async (req, res, next) => {
  next()
})
app.use('/api/user', usersRouter);
app.use('/api/post', postsRouter);

const start = async () => {
    // getConnectionOptions()
    // .then( data => {
    //   console.log("--- Here then -----------");
    //   // console.log(data);
    //
    //   createConnection(data).then(async connection => {
    //     console.log("--- Here connection -----------");
    //     // console.log(connection);
    //   }).catch(e => console.log(e));
    // })
    // .catch(e => console.log(e));
  try {
    console.log("--- Here env -----------------------");
    console.log(process.env.NODE_ENV);
    console.log(process.env.APP_PORT);
    console.log(process.env.MONGO_CONNECTION_STRING);
    console.log("------------------------------------");

    let connectionOptions = await getConnectionOptions();
    await createConnection(
      Object.assign(connectionOptions, {
        url: process.env.MONGO_CONNECTION_STRING
      })
    );

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

  app.listen(process.env.APP_PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${process.env.APP_PORT}`
    );
  })
}

start()
  .catch(err => console.log(err));