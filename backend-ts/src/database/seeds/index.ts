import roleFactory from '../factories/roleFactory'
import userFactory from '../factories/userFactory'
import PostFactory from "../factories/PostFactory";
import { AppDataSource } from "../../AppDataSource";
import config from "../../config";
import { ObjectId } from "mongodb";
import { Post } from "../models/Post";
import CommentFactory from "../factories/CommentFactory";
import { Comment } from '../models/Comment';

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
    //------------------------------------------------------------
    let superadmin = await roleFactory.create({name: 'superadmin' });
    let admin = await roleFactory.create({name: 'admin' });
    let user = await roleFactory.create({name: 'user' });
    console.log(superadmin[0].name, ' ', admin[0].name, ' ', user[0].name);
    // ------------------------------------------------------------
    superadmin = await userFactory.create({
      _id: new ObjectId('1a1111111111111111111111'),
      email: 'andreygoldpua@gmail.com',
      password: '111',
      role: 'superadmin'
    }, 1);

    admin = await userFactory.create({
      _id: new ObjectId('2a1111111111111111111111'),
      email: 'aaa@gmail.com',
      password: '111',
      role: 'admin'
    }, 1);

    user = await userFactory.create({
      _id: new ObjectId('3a1111111111111111111111'),
      email: 'bbb@gmail.com',
      password: '111',
      role: 'user'
    }, 1);
    console.log(superadmin[0].email, ' ', admin[0].email, ' ', user[0].email);
    //------------------------------------------------------------

    let posts: Post[] = [];
    for(let i=1; i < 6; i++) {
      const post = await PostFactory.create({
        _id: new ObjectId(`${i}`+'a2222222222222222222222'),
        userId: user[0]._id
      });
      posts.push(post[0]);
    }
    console.log(posts.map((item: Post) => item.title));

    //------------------------------------------------------------
    let comments: Comment[] = [];
    for(let i=1; i < 4; i++) {
      const comment = await CommentFactory.create({
        _id: new ObjectId(`${i}`+'a3333333333333333333333'),
        userId: user[0]._id,
        postId: posts[0]._id,
      });
      comments.push(comment[0]);
    }

    console.log(comments.map((item: Comment) => item.body));
    //------------------------------------------------------------

    console.log('Entities created ----------------');

    process.exit();
  } catch (e) {
    console.log(e)
  }
})();
