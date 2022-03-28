import faker from "@faker-js/faker";
import roleFactory from '../factories/roleFactory'
import userFactory from '../factories/userFactory'
import userFactory_ from '../factories/userFactory_'
import {createConnection, createQueryBuilder, getConnectionOptions, getMongoManager} from "typeorm";
import {User} from "../models/User";
import {Post} from "../models/Post";
import PostFactory from "../factories/PostFactory";

(async () => {
  console.log('Common Seeder -------------------');

  // try{
// console.log('Here common seeder! -------')
// console.log(faker.commerce.product())
// console.log(faker.commerce.product())
// console.log(faker.hacker.noun())
// console.log(faker.hacker.noun())
// console.log(faker.lorem.word())
// console.log(faker.lorem.word())
// console.log(faker.lorem.sentence())
// console.log(faker.lorem.sentence())
// console.log(faker.random.word())
// console.log(faker.random.word())

  try {
    let connectionOptions = await getConnectionOptions();

    await createConnection(
      Object.assign(connectionOptions, {
        url: process.env.MONGO_CONNECTION_STRING
      })
    );
    //------------------------------------------------------------
    let superadmin = await roleFactory.create({name: 'superadmin' });
    let admin = await roleFactory.create({name: 'admin' });
    let user = await roleFactory.create({name: 'user' });
    console.log(superadmin[0].name, ' ', admin[0].name, ' ', user[0].name);
    // // ------------------------------------------------------------
    superadmin = await userFactory.create({
      email: 'andreygoldpua@gmail.com',
      password: '111',
      role: 'superadmin'
    }, 1);

    admin = await userFactory.create({
      email: 'aaa@gmail.com',
      password: '111',
      role: 'admin'
    }, 1);

    user = await userFactory.create({
      email: 'bbb@gmail.com',
      password: '111',
      role: 'user'
    }, 1);
    console.log(superadmin[0].email, ' ', admin[0].email, ' ', user[0].email);
    // console.log(superadmin[0].email);
    // //------------------------------------------------------------
    const post = await PostFactory.create({
      user: user[0].email
      // user: 'bbb@gmail.com'
    }, 5);

    console.log(post);
    // console.log(posts.map(item => item.title));

    //------------------------------------------------------------
    //------------------------------------------------------------

    console.log('Entities created ----------------');

    //------------------------------------------------------------
    // const posts_ = await getMongoManager().find(Post);
    // console.log(posts_);
    //------------------------------------------------------------

    process.exit();
  } catch (e) {
    console.log(e)
  }
})();