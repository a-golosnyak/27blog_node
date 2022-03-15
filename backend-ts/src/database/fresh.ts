import { createConnection } from "typeorm";

createConnection().then(async connection => {
  console.log('Collections to delete');
  const entities = connection.entityMetadatas;

  for(const entity of entities) {
    console.log("-------------------");
    console.log(entity.tableName);
  }
  console.log("-------------------");

  await connection.synchronize(true);
}).then(() => {

})
  .catch(error => console.log(error))
  .finally(()=> {
    console.log('Deleted!');
    process.exit();
  })