import {createConnection, DataSource} from "typeorm";
import ormconfig from "../../ormconfig";

(async () => {
  try {
    const dataSource = new DataSource(ormconfig);
    await dataSource.initialize()
      .then(() => {
        console.log('Data Source has been initialized!');
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });

    // console.log('Collections to delete');
    // const entities = dataSource.connection.entityMetadatas;
    // const entities = dataSource.getMetadata('api-design');
    //
    // for(const entity of entities) {
    //   console.log("-------------------");
    //   console.log(entity.tableName);
    // }
    // console.log("-------------------");

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
