import {DataSource} from 'typeorm';
import ormconfig from "../ormconfig";

export const AppDataSource = new DataSource(ormconfig);

// AppDataSource.initialize()
//   .then(() => {
//     console.log('Data Source has been initialized!');
//   })
//   .catch((err) => {
//     console.error('Error during Data Source initialization', err);
//   });
