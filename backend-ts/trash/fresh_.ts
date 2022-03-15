import {User} from "../src/database/models/User";
import faker from "@faker-js/faker";
import {createConnection} from "typeorm";

console.log('Fresh are being started to execute.');


  // (async () => {
  //   const user = new User();
  //   console.log('1 user');
  //   user.firstName = faker.name.firstName();
  //   user.lastName = faker.name.lastName();
  //   user.email = faker.internet.email(user.firstName, user.lastName);
  //   user.age = faker.datatype.number(({min: 10, max: 60}));
  //   await user.save();
  //   console.log('2 save');
  // })();

createConnection().then(async connection => {

  await connection.synchronize(true);
  console.log('Ready!');

})
  .catch(error => console.log(error))
  .finally(()=> process.exit())





// import { connect } from '../utils/db';
// const mongoose = require('mongoose');
//
// (async () => {
//   await connect();
//
//   const db = mongoose.connection.db;
//   const collections = await db.listCollections().toArray();
//
//   console.log(
//     collections.map(item => {
//       return item.name;
//     })
//   );
//
//   collections
//     .map(collection => collection.name)
//     .forEach(async collectionName => {
//       db.dropCollection(collectionName);
//     });
//
//   console.log('Database cleared!');
//   process.exit();
// })();


// import { createConnection } from "typeorm";

// createConnection().then(async connection => {
//   console.log('Fresh are being started to execute.');
//   await connection.synchronize(true);
// })
//   .catch(error => console.log(error))
//   .finally(()=> {
//     console.log('Ready!');
//     process.exit();
//   })
