import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import { AppError } from "../utils/AppError";
import { User } from "../database/models/User";

class UsersController {
  static async index(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await User.find();
      res.status(200).json({ data: users });
    } catch (err) {
      next(err);
    }
  }

  static async show(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await User.findOne({ where: { _id: new ObjectId(req.params.id) } });
      if (!user) throw new AppError("User not found", 404);
      res.status(200).json({ data: user });
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = new User();
      Object.assign(user, req.body);
      user.password = user.hashPassword(req.body.password);
      await user.save();
      res.status(201).json({ data: { id: user._id } });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let user = await User.findOne({ where: { _id: new ObjectId(req.params.id) } });
      if (!user) throw new AppError("User not found", 404);
      Object.assign(user, req.body);
      if (req.body.password) {
        user.password = user.hashPassword(req.body.password);
      }
      user = await user.save();
      res.status(200).json({ data: user });
    } catch (err) {
      next(err);
    }
  }

  static async destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await User.findOne({ where: { _id: new ObjectId(req.params.id) } });
      if (!user) throw new AppError("User not found", 404);
      const deletedUser = await User.softRemove(user);
      res.status(200).json({ data: deletedUser });
    } catch (err) {
      next(err);
    }
  }
}

export default UsersController;
