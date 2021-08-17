import userSeeder from './userSeeder.js';
import listSeeder from './listSeeder.js';

// let seeder = require('./userSeeder')
import { User } from '../../old/resources/user/user.model'
import { List } from '../../old/resources/list/list.model'
import { Item } from '../../old/resources/item/item.model'
import  faker  from 'faker'
import bcrypt from "bcrypt";
import {connect} from "../../old/utils/db";

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

    // let user = await User.create({
    //     email: faker.internet.email(),
    //     password: '111'
    // });

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
    let lists = await listSeeder.create({}, 1);

    // let item = await Item.create({
    //     name: faker.hacker.noun(),
    //     status: 'complete',
    //     createdBy: user.id,
    //     list: list.id
    // })


    console.log(lists.map( (i) => i.name))
    process.exit();
})();


