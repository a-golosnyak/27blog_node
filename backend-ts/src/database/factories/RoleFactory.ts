import { Role } from '../models/Role';
import faker from '@faker-js/faker';

export default class RoleFactory {
  static async create(params: any , qty = 1) {
    const models = [];

    for (let i = 0; i < qty; i++) {
      const model = new Role();
      model.name = params?.name ?? faker.word;
      let result = await model.save();
      models.push(result);
    }
    return models;
  }
}

