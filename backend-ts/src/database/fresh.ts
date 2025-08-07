import { DataSource } from "typeorm";
import ormconfig from "../../ormconfig";
import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions";
import config from "../config";

(async () => {
  try {
    const dataSource = new DataSource({
      ...ormconfig,
      url: config.MONGO_CONNECTION_STRING,
      host: config.MONGO_HOST,
      port: config.MONGO_PORT as number
    } as MongoConnectionOptions);

    await dataSource.initialize()
      .then(() => {
        console.log('Data Source has been initialized!');
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });

    await dataSource.synchronize(true);
    console.log('Deleted!');
    process.exit();
  } catch (e) {
    console.log(e)
  }
})();

// createConnection().then(async connection => {
//   console.log('Collections to delete');
//   const entities = connection.entityMetadatas;
//
//   for(const entity of entities) {
//     console.log("-------------------");
//     console.log(entity.tableName);
//   }
//   console.log("-------------------");
//
//   await connection.synchronize(true);
// }).then(() => {
//
// })
//   .catch(error => console.log(error))
//   .finally(()=> {
//     console.log('Deleted!');
//     process.exit();
//   })
