import dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

export default {
  APP_URL: process.env.APP_URL || "http://localhost",
  APP_PORT: process.env.APP_PORT || "3000",
  MONGO_HOST: process.env.MONGO_HOST || 'localhost',
  MONGO_PORT: process.env.MONGO_PORT || 27018,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27018/api-design',
  secrets: {
    jwt: process.env.JWT_SECRET || 'secret',
    jwtExp: process.env.JWT_EXP || '1w'
  }
}
