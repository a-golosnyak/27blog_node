import { NextFunction, Request, Response } from 'express';
import Validator from 'validatorjs';
import Post from "../../rules/Post";
import { AppError } from "../../utils/AppError";

export class UpdatePostRequest {
  static async validate(req: Request, res: Response, next: NextFunction) {
    let validation = new Validator(req.body, UpdatePostRequest.rules(), Post.messages());

    if(validation.passes()) {
      next();
    } else
      throw new AppError(validation.errors, 422);
  }

  static rules(){
    return {
      title: 'string',
      body: 'string',
      userId: 'string',
    }
  }
}
