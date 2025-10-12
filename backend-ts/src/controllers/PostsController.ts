import { Post } from "../database/models/Post";
import { User } from "../database/models/User";
import { ObjectId } from "mongodb";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { UserType } from "database/models/types";
import { AuthRequest } from "middleware/types/AuthRequestInterface";

class PostsController {
  static async index(req: Request, res: Response, next: NextFunction): Promise<void> {
    const docs = await Post.find({
      order: { createdAt: 'DESC' }
    });

    // Получаем уникальные userId из постов
    const userIds = Array.from(new Set(docs.map(p => p.userId?.toString()).filter(Boolean)));

    let usersById: Record<string, UserType> = {};

    if (userIds.length > 0) {
      const users = await User.find({
        where: {
          // @ts-ignore
          _id: { $in: userIds.map(id => ObjectId.createFromHexString(id)) }
        }
      });

      usersById = users.reduce((acc, user: User) => {
        acc[user._id.toString()] = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          age: user.age,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          role: user.role,
        };
        return acc;
      }, {});
    }

    // Добавляем пользователя к каждому посту
    const postsWithUser = docs.map(post => ({
      ...post,
      user: usersById[post.userId?.toString()] || null
    }));

    res.status(200).send({data: postsWithUser});
  }

  static async show(req: AuthRequest, res: Response, next: NextFunction) {
    const doc = await Post.findOne({ where: { _id: new ObjectId(req.params.id) } });

    if (!doc) {
      throw new AppError("Post not found", 404);
    }

    res.status(200).json({ data: doc });
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    const post: Post = Post.create({
      ...req.body,
      userId: ObjectId.createFromHexString(req.body.userId)
    });

    await post.save();

    res.status(201).json({ data: post });
  }

  static async update(req: AuthRequest, res: Response, next: NextFunction) {
    let updatedPost: Post = await Post.findOne({ where: { _id: new ObjectId(req.params.id) } });

    if (!updatedPost) {
      throw new AppError('Post not found', 404);
    }

    if (!updatedPost.isAuthor(req.user._id)) {
      throw new AppError("You are not the author of this post", 403);
    }

    Object.assign(updatedPost, req.body);
    updatedPost = await updatedPost.save();

    res.status(200).json({ data: updatedPost })
  }

  static async destroy(req: AuthRequest, res: Response, next: NextFunction) {
    let postToDelete: Post = await Post.findOne({ where: { _id: new ObjectId(req.params.id) } });
    if (!postToDelete) {
      throw new AppError('Doesn\'t find', 404);
    }

    console.log('req.user', req.user);
    console.log('updatedPost.userId', postToDelete.userId);

    if (!postToDelete.isAuthor(req.user._id)) {
      throw new AppError("You are not the author of this post", 403);
    }
    const deletedPost = await Post.softRemove(postToDelete);
    return res.status(200).json({ data: deletedPost })
  }
}

export default PostsController
