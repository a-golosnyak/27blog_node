import path from 'path';
import dotenv from 'dotenv';

// import { merge } from 'lodash'
// const env = process.env.NODE_ENV || 'development'
//
// const baseConfig = {
//   env,
//   isDev: env === 'development',
//   isTest: env === 'testing',
//   port: 3000,
//   secrets: {
//     jwt: process.env.JWT_SECRET,
//     jwtExp: '100d'
//   }
// }
//
// let envConfig = {}
//
// switch (env) {
//   case 'dev':
//   case 'development':
//     envConfig = require('./dev').config
//     break
//   case 'test':
//   case 'testing':
//     envConfig = require('./testing').config
//     break
//   default:
//     envConfig = require('./dev').config
// }
//
// export default merge(baseConfig, envConfig)

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

export default {
  APP_URL: process.env.APP_URL || "http://localhost.xxx",
  APP_PORT: process.env.APP_PORT || "3000",
  MONGO_HOST: 'localhost',
  MONGO_PORT: 27017,
  MONGO_CONNECTION_STRING: 'mongodb://mongo:27017/api-design',
  secrets: {
    jwt: process.env.JWT_SECRET || 'secret',
    jwtExp: process.env.JWT_EXP || '1w'
  }
}
