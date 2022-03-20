import faker from "@faker-js/faker";
import userSeeder from '../seeds/userSeeder'
import {createConnection, getConnectionOptions} from "typeorm";
import {User} from "../models/User";

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
    let users = await userSeeder.create({lastName: 'Smith1' }, 2);
    console.log(users.map((item) => item.email));
    //------------------------------------------------------------

    //------------------------------------------------------------

    console.log('Entities created ----------------');

    process.exit();
  } catch (e) {
    console.log(e)
  }
})();