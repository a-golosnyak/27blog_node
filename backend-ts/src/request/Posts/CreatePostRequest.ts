import { NextFunction, Request, Response } from "express";
import Validator from "validatorjs";
import Post from "../../rules/Post";

export class CreatePostRequest {
  static async validate(req: Request, res: Response, next: NextFunction): Promise<void> {
    let validation = new Validator(req.body, CreatePostRequest.rules(), Post.messages());

    if (validation.passes()) {
      next();
    } else {
      res.status(422).send(validation.errors)
    }
  }

  static rules(){
    return {
      title:  'required|string',
      body:   'required|string',
      user:   'required|string',
    }
  }
}
