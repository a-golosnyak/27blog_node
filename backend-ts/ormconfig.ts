import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";

const ormconfig: DataSourceOptions = {
   type: "mongodb",
   database: "api-design",
   synchronize: true,
   logging: false,
   entities: [
      "src/database/models/*.ts"
   ],
   migrations: [
      "src/database/migration/*.ts"
   ],
   subscribers: [
      "src/database/subscriber/*.ts"
   ],
   // cli: {
   //    "entitiesDir": "src/database/models",
   //    "migrationsDir": "src/database/migration",
   //    "subscribersDir": "src/database/subscriber"
   // }
};

export default ormconfig
