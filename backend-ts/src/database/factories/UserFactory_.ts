import { User } from '../models/User';
import faker from 'faker';
import {getMongoManager} from "typeorm";

export default class UserFactory {
  static async create(params: any , qty = 1) {
    const users = [];

    // const user = new User();
    // user.email = params?.email ?? faker.internet.email(user.firstName, user.lastName);
    // await User.update({email: 'andreygoldpua@gmail.com'},
    //   {
    //     $setOnInsert: {
    //       email: 'andreygoldpua@gmail.com',
    //       firstName: 'Aaa'
    //     }
    //   },
    //   {upsert: true}
    // );

    // const model = await getMongoManager().update(
    //   {
    //     "noExist": true
    //   },
    //   {
    //     $setOnInsert: {
    //       email: 'andreygoldpua@gmail.com',
    //       firstName: 'Aaa'
    //     }
    //   },
    //   {
    //     upsert: true
    //   }
    // );
    // console.log(user);

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

