import { User } from "../database/models/User";
import userFactory from "../database/factories/UserFactory";
import { AuthService } from "../services/AuthService";
import { AppDataSource } from "../AppDataSource";

export class AuthController {
  static appDataSource = AppDataSource;

  static async register(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'need email and password' })
    }

    try {
      console.log('----- AuthController.register -------------------');
      console.log(req.body);

      // const userExists = await this.appDataSource.manager.findOne(User, {where: {email: req.body.email}});
      const userExists = await User.findOne({where: {email: req.body.email}});
      console.log('----- userExists ', userExists);

      if (userExists) {
        return res.status(400).send({ message: 'User allready exists'});
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
      const user = await User.findOne({where: {email: req.body.email}});

      console.log('----- user ', user);

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
