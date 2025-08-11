import { Post } from "../database/models/Post";
import { ObjectId } from "mongodb";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

class PostsController {
  static async index(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const docs = await Post.find();
      // console.log('--- Here PostsController.index ------');

      res.status(200).send({data: docs});
    } catch (err) {
      next(err)
    }
  }

  static async show(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await Post.findOne({ where: { _id: new ObjectId(req.params.id) } });

      if (!doc) {
        throw new AppError("Not found", 404);
      }

      res.status(200).json({ data: doc });
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    // console.log('----- PostsController.create -------------------');

    try {
      const post: Post = Post.create({
        ...req.body,
        userId: new ObjectId(req.body.userId)
      });

      await post.save();

      res.status(201).json({ data: { id: post._id }});
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    // try {
    //   console.log('----- PostsController.update --------------------');
      let updatedPost: Post = await Post.findOne({ where: { _id: new ObjectId(req.params.id) } });

      if (!updatedPost) {
        throw new AppError('Post not found', 404);
      }

      Object.assign(updatedPost, req.body);
      updatedPost = await updatedPost.save();

      res.status(200).json({ data: updatedPost })
    // } catch (err) {
    //   next(err);
    // }
  }

  static async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      // console.log('----- PostsController.destroy -------------------');
      let postToDelete: Post = await Post.findOne({ where: { _id: new ObjectId(req.params.id) } });

      if (!postToDelete) {
        throw new AppError('Doesn\'t find', 404);
      }

      const deletedPost = await Post.softRemove(postToDelete);

      return res.status(200).json({ data: deletedPost })
    } catch (err) {
      next(err);
    }
  }
}

export default PostsController
