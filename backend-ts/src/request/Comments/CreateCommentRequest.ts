import Comment from "../../rules/Comment";
import { NextFunction, Request, Response } from "express";
import Validator from "validatorjs";
import { AppError } from "../../utils/AppError";

export class CreateCommentRequest {
  static validate(req: Request, res: Response, next: NextFunction) {
    let validation = new Validator(req.body, CreateCommentRequest.rules(), Comment.messages());

    if (validation.passes()) {
      next();
    } else {
      throw new AppError(validation.errors, 422);
    }
  }

  static rules(): Record<string, string> {
    return {
      body:   'required|string',
      userId: 'required|string',
      postId: 'required|string',
    }
  }
}
