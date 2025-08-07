import roleFactory from '../factories/roleFactory'
import userFactory from '../factories/userFactory'
import PostFactory from "../factories/PostFactory";
import { AppDataSource } from "../../AppDataSource";
import config from "../../config";
import { ObjectId } from "mongodb";
import { Post } from "../models/Post";

(async () => {
  console.log('Common Seeder -------------------');
  console.log('config.MONGO_HOST', config.MONGO_HOST);
  console.log('config.MONGO_PORT', config.MONGO_PORT);
  console.log('config.MONGO_URL', config.MONGO_CONNECTION_STRING);

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
    await AppDataSource.initialize()
      .then(() => {
        console.log('Data Source has been initialized!');
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });

    //------------------------------------------------------------
    let superadmin = await roleFactory.create({name: 'superadmin' });
    let admin = await roleFactory.create({name: 'admin' });
    let user = await roleFactory.create({name: 'user' });
    console.log(superadmin[0].name, ' ', admin[0].name, ' ', user[0].name);
    // // ------------------------------------------------------------
    superadmin = await userFactory.create({
      _id: new ObjectId('111111111111111111111111'),
      email: 'andreygoldpua@gmail.com',
      password: '111',
      role: 'superadmin'
    }, 1);

    admin = await userFactory.create({
      _id: new ObjectId('222222222222222222222222'),
      email: 'aaa@gmail.com',
      password: '111',
      role: 'admin'
    }, 1);

    user = await userFactory.create({
      _id: new ObjectId('333333333333333333333333'),
      email: 'bbb@gmail.com',
      password: '111',
      role: 'user'
    }, 1);
    console.log(superadmin[0].email, ' ', admin[0].email, ' ', user[0].email);
    // //------------------------------------------------------------
    const posts = await PostFactory.create({
      userId: user[0]._id
    }, 5);

    // console.log(post);
    console.log(posts.map((item: Post) => item.title));

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
