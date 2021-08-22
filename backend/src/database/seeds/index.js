import userSeeder from './userSeeder.js';
import roleSeeder from './roleSeeder.js';
import listSeeder from './listSeeder.js';

// let seeder = require('./userSeeder')
// import { User } from '../../models/user.model'
// import { List } from '../../models/list.model'
// import { Item } from '../../models/item.model'
import { Role } from '../../models/role.model'
import  faker  from 'faker'
import bcrypt from "bcrypt";
import {connect} from "../../utils/db";

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

// let user = userSeeder();
// let userSeeder = new userSeeder1();

// userSeeder.seedData()

(async() => {
    await connect();

    console.log('Here common seeder! ------- 1')

   //  let user = await User.create({
   //      email: faker.internet.email(),
   //      password: '111'
   //  });

    // let users = await userSeeder.create({}, 1)
    // console.log(users.map( (i) => i.email))
    // console.log(users)

    // let list = await List.create({
    //     name: faker.hacker.noun() + 's',
    //     status: 'complete',
    //     createdBy: user.id
    // });

    // let lists = await listSeeder.create({
    //     createdBy:  users[0]._id
    // }, 2);
    // let lists = await listSeeder.create({}, 1);

    let roles = await roleSeeder.create({name: 'admin'}, 1);
    let roles1 = await roleSeeder.create({name: 'user'}, 1);

    console.log(roles);
    console.log(roles1);

    let users = await userSeeder.create({
      role: roles[0]._id
    }, 1);
    let users1 = await userSeeder.create({
      role: roles1[0]._id
    }, 1);

    console.log(users);
    console.log(users1);

    // let item = await Item.create({
    //     name: faker.hacker.noun(),
    //     status: 'complete',
    //     createdBy: user.id,
    //     list: list.id
    // })


    // console.log(roles.map( (i) => i.name));
    // console.log(roles1.map( (i) => i.name));
    // console.log(users.map( (i) => i.name));
    // console.log(users1.map( (i) => i.name));
    process.exit();
})();


