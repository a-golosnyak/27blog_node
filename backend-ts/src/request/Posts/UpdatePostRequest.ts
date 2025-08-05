import { NextFunction, Request, Response } from 'express';
import Validator from 'validatorjs';
import Post from "../../rules/Post";

export class UpdatePostRequest {
  static async validate(req: Request, res: Response, next: NextFunction) {
    console.log('----- Middleware UpdatePostRequest.validate -----------------');

    let validation = new Validator(req.body, UpdatePostRequest.rules(), Post.messages());

    if(validation.passes()) {
      next();
    } else
      res.status(422).send(validation.errors)
  }

  static rules(){
    return {
      title: 'string',
      body: 'string',
      userId: 'string',
    }
  }
}
