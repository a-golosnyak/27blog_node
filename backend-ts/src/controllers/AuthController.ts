import { User } from "../database/models/User";
import config from "../config";
import userFactory from "../database/factories/UserFactory";
import {AuthService} from "../services/AuthService";
import {getMongoManager} from "typeorm";
import {Post} from "../database/models/Post";

export class AuthController {
  static async register(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'need email and password' })
    }

    try {
      console.log('----- AuthController.register ------------------');
      console.log(req.body);

      const userExists = await getMongoManager().findOne(User, {email: req.body.email});
      if (userExists) {
        return res.status(400).send({ message: 'user allready exists'});
      }

      const user = await userFactory.create({
        email: req.body.email,
        password: req.body.password,
        role: 'user'
      }, 1);

      const token = AuthService.newToken(user);
      return res.status(201).send({ token })
    } catch (e) {
      return res.status(500).end()
    }
  }

  static async login(req, res) {
    console.log('----- AuthController.login ------------------');

    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'need email and password' })
    }

    const invalid = { message: 'Invalid email and passoword combination' }

    try {
      const user = await getMongoManager().findOne(User, {email: req.body.email});

      if (!user) {
        return res.status(401).send(invalid)
      }
      const match = await user.checkPassword(req.body.password)

      if (!match) {
        return res.status(401).send(invalid)
      }

      const token = AuthService.newToken(user)
      return res.status(201).send({ token })
    } catch (e) {
      console.error(e)
      res.status(500).end()
    }
  }
}