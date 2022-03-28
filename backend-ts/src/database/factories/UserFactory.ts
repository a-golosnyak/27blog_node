import { User } from '../models/User';
import faker from 'faker';

export default class UserFactory {
  static async create(params: any , qty = 1) {
    const users = [];

    for (let i = 0; i < qty; i++) {
      const user = new User();
      user.firstName = params?.firstName ?? faker.name.firstName();
      user.lastName = params?.lastName ?? faker.name.lastName();
      user.age = params?.age ?? faker.datatype.number({min: 10, max: 60});
      user.email = params?.email ?? faker.internet.email(user.firstName, user.lastName);
      user.role = params?.role ?? 'user'
      let result = await user.save();
      users.push(result);
    }

    return users;
  }
}

