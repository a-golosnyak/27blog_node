import { User } from "../database/models/User";
import userFactory from "../database/factories/UserFactory";
import { AuthService } from "../services/AuthService";
import { Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { AuthRequest } from "../middleware/types/AuthRequestInterface";

export class AuthController {
  static async register(req: Request, res: Response) {
    if (!req.body.email || !req.body.password) {
      throw new AppError('Need email and password', 400);
    }

    console.log('----- AuthController.register -------------------');

    const userExists = await User.findOne({ where: { email: req.body.email } });
    console.log('----- userExists ', userExists);

    if (userExists) {
      throw new AppError('User allready exists', 400);
    }

    let user: any = await userFactory.create({
      email: req.body.email,
      password: req.body.password,
      role: 'user'
    }, 1);

    user = user[0];

    console.log('----- Here 3 user ', user);

    const token = AuthService.newToken(user);
    const { password, ...userWithoutPassword } = user;

    return res.status(201).send({ token, user: userWithoutPassword })
  }

  static async login(req: Request, res: Response): Promise<Response> {
    console.log('----- AuthController.login ------------------');

    if (!req.body.email || !req.body.password) {
      throw new AppError('Need email and password', 400);
    }

    const invalid = 'Invalid email and passoword combination'
    const user = await User.findOne({where: {email: req.body.email}});

    if (!user) {
      throw new AppError(invalid, 401);
    }
    const match = await user.checkPassword(req.body.password)

    if (!match) {
      throw new AppError(invalid, 401);
    }
    const token = AuthService.newToken(user)
    const { password, ...userWithoutPassword } = user;

    return res.status(201).send({ token, user: userWithoutPassword })
  }

  static async me(req: AuthRequest , res: Response) {
    console.log('----- AuthController.me ------------------');
    if (!req.user) throw new AppError('Unauthorized', 401);

    // @ts-ignore
    const { password, ...userWithoutPassword } = req.user;

    res.status(200).json({ user: userWithoutPassword });
  }
}
