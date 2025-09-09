import faker from "@faker-js/faker";
import { ObjectId } from "mongodb";
import { Post } from "../models/Post";

export default class PostFactory {
  static async create(params: Partial<Post> = {} , qty = 1): Promise<Post[]> {
    const posts: Post[] = [];

    for (let i = 0; i < qty; i++) {
      const post = new Post();
      if(params._id) {
        post._id = params._id;
      }
      post.title = params.title ?? 'Title ' + faker.lorem.sentence();
      post.body = params.body ?? faker.lorem.paragraph(10);
      post.userId = params.userId ?? new ObjectId();
      let saved = await post.save();
      posts.push(saved);
    }
    return posts;
  }
}
