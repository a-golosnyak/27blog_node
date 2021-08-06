// import  userSeeder from './userSeeder.js';
// let seeder = require('./userSeeder')
// import User from '../../resources/user/user.model'
import { Item } from '../../resources/item/item.model'
import  faker  from 'faker'

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

(async () => {
    let item = await Item.create({
        name: faker.hacker.noun(),
        status: 'complete'
    })

    // console.log(item)
})();
