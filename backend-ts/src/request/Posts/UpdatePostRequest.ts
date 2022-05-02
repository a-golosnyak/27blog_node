import Validator from 'validatorjs';
import Post from "../../rules/Post";

export class UpdatePostRequest {
  static async validate(req, res, next) {
    console.log('----- Middleware UpdatePostRequest.validate -----------------');
    console.log(req.body);

    let validation = new Validator(req.body, UpdatePostRequest.rules(), Post.messages());

    console.log(validation.passes());
    console.log(validation.errors); // returns 'Without an email we can\'t reach you!'

    if(validation.passes()) {
      next();
    } else
      res.status(422).send(validation.errors)
  }

  static rules(){
    return {
      title: 'string',
      body: 'string',
      user: 'string',
    }
  }
}