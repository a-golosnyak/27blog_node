import Validator from 'validatorjs';

export class CreatePostRequest {
  constructor() {}

  static async validate(req, res, next) {
    console.log('----- Middleware CreatePostRequest.validate ------------------');
    console.log(req.body);

    let rules = {
      email : 'required',
      firstName : 'required',
      lastName : 'required',
    };

    let validation = new Validator(req.body, rules, {
      "required.email": "Without an :attribute we can't reach you!",
      "required.firstName": "Without an :attribute we can't reach you!",
      "required.lastName": "Without an :attribute we can't reach you!!"
    });

    console.log(validation.passes());
    console.log(validation.passes());
    console.log(validation.errors); // returns 'Without an email we can\'t reach you!'

    if(validation.passes()) {
      next();
    }
    res.status(422).send(validation.errors)
  }
}