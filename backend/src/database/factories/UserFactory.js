import Factory from './factory.js'
import  faker  from 'faker'

const factory = new Factory(faker);

factory.define('User', (faker) => {
    return {
        email: faker.internet.email(),
        password: '111'
    }
});

export default factory;