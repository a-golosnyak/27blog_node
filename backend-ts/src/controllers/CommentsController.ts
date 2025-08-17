import { ObjectId } from "mongodb";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { Comment } from "../database/models/Comment";

class CommentsController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const comments = await Comment.find();
      res.status(200).json({ data: comments });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    const comment = await Comment.findOne({ where: { _id: ObjectId.createFromHexString(req.params.id) } });
    if (!comment) {
      throw new AppError('Comment not found', 404);
    }
    res.status(200).json({ data: comment });
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    const comment = Comment.create({
      ...req.body,
      userId: ObjectId.createFromHexString(req.body.userId),
      postId: ObjectId.createFromHexString(req.body.postId)
    });
    await comment.save();
    res.status(201).json({ data: { id: comment._id } });
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    let comment = await Comment.findOne({ where: { _id: new ObjectId(req.params.id) } });
    if (!comment) {
      throw new AppError('Comment not found', 404);
    }
    Object.assign(comment, req.body);
    comment = await comment.save();
    res.status(200).json({ data: comment });
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const comment = await Comment.findOne({ where: { _id: new ObjectId(req.params.id) } });
    if (!comment) {
      throw new AppError('Comment not found', 404);
    }
    await Comment.softRemove(comment);
    res.status(204).send({ data: comment });
  }
}

export default CommentsController
