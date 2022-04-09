import Validator from 'validatorjs';
import Post from "../../rules/Post";

export class CreatePostRequest {
  static async validate(req, res, next) {
    let validation = new Validator(req.body, CreatePostRequest.rules(), Post.messages());

    if(validation.passes()) {
      next();
    }
    res.status(422).send(validation.errors)
  }

  static rules(){
    return {
      email: 'required',
      firstName: 'required',
      lastName: 'required',
    }
  }
}