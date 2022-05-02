import Validator from 'validatorjs';
import Auth from "../../rules/Auth";

class RegisterRequest {
  static async validate (req, res, next) {
    let validation = new Validator(req.body, RegisterRequest.rules(), Auth.messages())

    console.log('----- RegisterRequest ------------------');

    if (validation.passes()) {
      next();
    } else {
      res.status(422).send(validation.errors)
    }
  }

  static rules() {
    return {
      email:    'required|string',
      password: 'required|string'
    }
  }
}

export default RegisterRequest