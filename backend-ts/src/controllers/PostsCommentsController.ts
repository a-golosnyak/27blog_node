import { Request, Response } from 'express';
import { AppDataSource } from '../AppDataSource';
import { Comment } from '../database/models/Comment';
import { User } from '../database/models/User';
import { ObjectId } from "mongodb";
import { UserType } from "../database/models/types";

export class PostsCommentsController {
  static async getCommentsByPostId(req: Request, res: Response) {
    const postId = req.params.postId;
    if (!postId) {
      return res.status(400).json({ message: 'postId is required' });
    }
    try {
      const comments = await AppDataSource.getRepository(Comment).find({
        where: { postId: ObjectId.createFromHexString(postId) },
        order: { createdAt: 'DESC' },
      });
      const userIds = Array.from(new Set(comments.map(c => c.userId?.toString()).filter(Boolean)));

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

      const commentsWithUser = comments.map(comment => ({
        ...comment,
        user: usersById[comment.userId?.toString()] || null
      }));

      return res.json({ data: commentsWithUser });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch comments', error: error?.message });
    }
  }
}
