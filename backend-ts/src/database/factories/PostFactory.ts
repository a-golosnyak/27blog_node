import faker from "@faker-js/faker";
import {Post} from "../models/Post";

export default class PostFactory {
  static async create(params: any , qty = 1) {
    const models = [];

    for (let i = 0; i < qty; i++) {
      const model = new Post();
      model.title = params.title ?? 'Title ' + faker.lorem.sentence();
      model.body = params.body ?? faker.lorem.paragraph();
      model.user = params.user;
      let result = await model.save();
      if (qty == 1) {
        return model;
      }
      models.push(result);
    }
    return models;
  }
}