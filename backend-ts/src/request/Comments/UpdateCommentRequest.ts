import { NextFunction, Request, Response } from "express";
import Validator from "validatorjs";
import Comment from "../../rules/Comment";
import { AppError } from "../../utils/AppError";

export class UpdateCommentRequest {
  static validate(req: Request, res: Response, next: NextFunction) {
    let validation = new Validator(req.body, UpdateCommentRequest.rules(), Comment.messages());

    if (validation.passes()) {
      next();
    } else {
      throw new AppError(validation.errors, 422);
    }
  }

  static rules(){
    return {
      body:   'string',
      userId: 'string',
      postId: 'string',
    }
  }
}
