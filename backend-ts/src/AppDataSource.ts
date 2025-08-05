import { DataSource } from 'typeorm';
import ormconfig from '../ormconfig';
import config from "./config";
import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions";

export const AppDataSource = new DataSource({
  ...ormconfig,
  url: config.MONGO_CONNECTION_STRING,
  host: config.MONGO_HOST,
  port: config.MONGO_PORT
} as MongoConnectionOptions);

// export const AppDataSource = new DataSource(ormconfig);

// AppDataSource.initialize()
//   .then(() => {
//     console.log('Data Source has been initialized!');
//   })
//   .catch((err) => {
//     console.error('Error during Data Source initialization', err);
//   });
