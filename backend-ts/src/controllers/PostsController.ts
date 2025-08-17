import { Post } from "../database/models/Post";
import { ObjectId } from "mongodb";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

class PostsController {
  static async index(req: Request, res: Response, next: NextFunction): Promise<void> {
      const docs = await Post.find();

      res.status(200).send({data: docs});
  }

  static async show(req: Request, res: Response, next: NextFunction) {
    const doc = await Post.findOne({ where: { _id: new ObjectId(req.params.id) } });

    if (!doc) {
      throw new AppError("Not found", 404);
    }

    res.status(200).json({ data: doc });
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    const post: Post = Post.create({
      ...req.body,
      userId: ObjectId.createFromHexString(req.body.userId)
    });

    await post.save();

    res.status(201).json({ data: { id: post._id }});
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    let updatedPost: Post = await Post.findOne({ where: { _id: new ObjectId(req.params.id) } });

    if (!updatedPost) {
      throw new AppError('Post not found', 404);
    }

    Object.assign(updatedPost, req.body);
    updatedPost = await updatedPost.save();

    res.status(200).json({ data: updatedPost })
  }

  static async destroy(req: Request, res: Response, next: NextFunction) {
    let postToDelete: Post = await Post.findOne({ where: { _id: new ObjectId(req.params.id) } });
    if (!postToDelete) {
      throw new AppError('Doesn\'t find', 404);
      // next(new AppError('Doesn\'t find', 404));
    }
    const deletedPost = await Post.softRemove(postToDelete);
    return res.status(200).json({ data: deletedPost })
  }
}

export default PostsController
