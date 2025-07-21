import roleFactory from '../factories/roleFactory'
import userFactory from '../factories/userFactory'
import PostFactory from "../factories/PostFactory";
import ormconfig from "../../../ormconfig.js"
import { AppDataSource } from "../../AppDataSource";

(async () => {
  console.log('Common Seeder -------------------');
  console.log(ormconfig.host);
  console.log(ormconfig.port);
  console.log(ormconfig.url);
  // console.log(ormconfig.process.env.MONGO_HOST);
  // console.log(ormconfig.process.env.MONGO_PORT);

  // try {
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
    // let connectionOptions = await DataSourceOptions();
    //
    // await createConnection(
    //   Object.assign(connectionOptions, {
    //     url: process.env.MONGO_CONNECTION_STRING
    //   })
    // );

    // const myDataSource = new DataSource(ormconfig)
    // await myDataSource.connect();

    // const appDataSource = new DataSource(ormconfig);
    // await appDataSource.initialize();
    // await appDataSource.connect();

    // const dataSource = new DataSource(ormconfig);
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
