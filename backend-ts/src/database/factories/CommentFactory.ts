import { Comment } from "../models/Comment";
import faker from '@faker-js/faker';
import { ObjectId } from "mongodb";

export default class CommentFactory {
  static async create(params: Partial<Comment> = {}, qty = 1): Promise<Comment[]> {
    const comments: Comment[] = [];

    for (let i = 0; i < qty; i++) {
      const comment = new Comment();
      if(params._id) {
        comment._id = params._id;
      }
      comment.body = params.body ?? faker.lorem.sentence();
      comment.userId = params.userId ?? new ObjectId();
      comment.postId = params.postId ?? new ObjectId();
      const saved = await comment.save();
      comments.push(saved);
    }

    return comments;
  }
}
