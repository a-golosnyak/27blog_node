import jwt from 'jsonwebtoken'
import config from '../config'
import {getMongoManager} from "typeorm";
import { User } from "../database/models/User";
import bcrypt from 'bcryptjs'
import { ObjectId } from 'mongodb'

export class AuthService {
  static newToken = user => {
    return jwt.sign({ id: user.id }, config.secrets.jwt, {
      expiresIn: config.secrets.jwtExp
    })
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

  static async hashPassword(password) {
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
      return res.status(401).end()
    }

    const token = bearer.split('Bearer ')[1].trim()
    let payload;
    try {
      payload = await AuthService.verifyToken(token);
    } catch (e) {
      return res.status(401).end()
    }

    console.log("--- payload.id ----", payload.id);

    const user = await User.findOne({ where: { _id: new ObjectId(payload.id) }});

    console.log("--- user -----", user.email);

    if (!user) {
      return res.status(401).end()
    }

    req.user = user
    next()
  }
}
