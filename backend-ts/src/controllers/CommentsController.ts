import { ObjectId } from "mongodb";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { Comment } from "../database/models/Comment";
import {AuthRequest} from "../middleware/types/AuthRequestInterface";

class CommentsController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const comments = await Comment.find({ order: { createdAt: 'DESC' } });
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
    res.status(201).json({ data: comment });
  }

  static async update(req: AuthRequest, res: Response, next: NextFunction) {
    let comment: Comment = await Comment.findOne({ where: { _id: new ObjectId(req.params.id) } });
    if (!comment) {
      throw new AppError('Comment not found', 404);
    }

    if(!comment.isAuthor(req.user._id)) {
      throw new AppError('You are not the author of this comment', 403);
    }

    Object.assign(comment, req.body);
    comment = await comment.save();
    res.status(200).json({ data: comment });
  }

  static async delete(req: AuthRequest, res: Response, next: NextFunction) {
    const comment = await Comment.findOne({ where: { _id: new ObjectId(req.params.id) } });
    if (!comment) {
      throw new AppError('Comment not found', 404);
    }

    if(!comment.isAuthor(req.user._id)) {
      throw new AppError('You are not the author of this comment', 403);
    }

    await Comment.softRemove(comment);
    res.status(204).send({ data: comment });
  }
}

export default CommentsController


if (subscriptions == null) return { statusCode: 422, reason: 'subscriptions is required param' };
if (typeof subscriptions !== 'object' || Array.isArray(subscriptions)) {
  return { statusCode: 422, reason: 'subscriptions must be an object of shape { [program: string]: string[] }' };
}
const programKeys = Object.keys(subscriptions);
if (programKeys.length === 0) {
  return { statusCode: 422, reason: 'subscriptions cannot be empty' };
}

// Validate each key/value pair
for (const program of programKeys) {
  if (typeof program !== 'string' || program.trim() === '') {
    return { statusCode: 422, reason: 'subscriptions contains an invalid (empty) program key' };
  }
  const mids = subscriptions[program];
  if (!Array.isArray(mids)) {
    return { statusCode: 422, reason: `value for program ${program} must be an array of strings` };
  }
  if (mids.length === 0) {
    return { statusCode: 422, reason: `program ${program} must have at least one MID` };
  }
  for (const mid of mids) {
    if (typeof mid !== 'string' || mid.trim() === '') {
      return { statusCode: 422, reason: `program ${program} has invalid MID (must be non-empty string)` };
    }
  }
