import jwt from 'jsonwebtoken'
import config from '../config'
import {getMongoManager} from "typeorm";
import { User } from "../database/models/User";
import bcrypt from 'bcryptjs'
import { ObjectId } from 'mongodb'
import {AppError} from "../utils/AppError";

export class AuthService {
  static newToken = (user: User) => {
    // @ts-ignore
    return jwt.sign(
      { id: user._id },
      config.secrets.jwt,
      { expiresIn: config.secrets.jwtExp }
    )
  }

  static verifyToken = (token: string) => {
    console.log("--- Here verifyToken -----------");
    console.log(token)

    return new Promise((resolve, reject) => {
      jwt.verify(token, config.secrets.jwt, (err, payload) => {
        if (err) return reject(err)
        resolve(payload)
      })
    })
  }

  static async hashPassword(password: string) {
    return await new Promise((resolve, reject) => {
      bcrypt.hash(password, 8, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      })
    })
  }

  static protect = async (req, res, next) => {
    const bearer = req.headers.authorization

    if (!bearer || !bearer.startsWith('Bearer ')) {
      throw new AppError('', 401);
    }

    const token = bearer.split('Bearer ')[1].trim()
    let payload;
    try {
      payload = await AuthService.verifyToken(token);
    } catch (e) {
      throw new AppError('', 401);
    }

    const user = await User.findOne({ where: { _id: new ObjectId(payload.id) }});

    if (!user) {
      throw new AppError('', 401);
    }

    req.user = user
    next()
  }
}
