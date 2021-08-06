// export const
import  faker  from 'faker'
// let faker = require('faker')

console.log('Here user seeder! -------')
console.log(faker.name.findName())

let userSeeder1 = {
    a: '1',
    seedData() {
        console.log('Here seeder 1 ! -------')
    }
}

export class userSeeder2 {
    constructor(name) {
        this.name = name;
    }

    seedData() {
        console.log('Here seeder 1 ! -------')
    }
}

let userSeeder3 = name => {
    function seedData(name) {
        console.log('Here seeder 2 ! -------')
    }
}

// module.exports = userSeeder2;