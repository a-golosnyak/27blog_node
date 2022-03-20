import { User } from '../models/User';
import faker from 'faker';

export default class UserSeeder {
  static async create(params: any , qty = 1) {
    const users = [];
    let user;

    for (let i = 0; i < qty; i++) {
      user = new User();
      user.firstName = params?.firstName ?? faker.name.firstName();
      user.lastName = params?.lastName ?? faker.name.lastName();
      user.age = params?.age ?? faker.datatype.number({min: 10, max: 60});
      user.email = params?.email ?? faker.internet.email(user.firstName, user.lastName);
      let result = await user.save();
      users.push(result);
    }

    users.push(user);
    return users;
  }
}
