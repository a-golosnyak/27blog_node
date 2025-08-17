import { NextFunction, Request, Response } from "express";
import Validator from "validatorjs";
import Post from "../../rules/Post";
import { AppError } from "../../utils/AppError";

export class CreatePostRequest {
  static async validate(req: Request, res: Response, next: NextFunction): Promise<void> {
    let validation = new Validator(req.body, CreatePostRequest.rules(), Post.messages());

    if (validation.passes()) {
      next();
    } else {
      throw new AppError(validation.errors, 422);
    }
  }

  static rules(){
    return {
      title:  'required|string',
      body:   'required|string',
      userId:   'required|string',
    }
  }
}
