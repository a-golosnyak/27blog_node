module.exports = {
   "type": "mongodb",
   "database": "api-design",
   "synchronize": true,
   url: process.env.MONGO_CONNECTION_STRING,    // needed for app into container
   "host": process.env.MONGO_HOST || 'localhost',  // seeder option
   "port": process.env.MONGO_PORT || '27018',      // seeder option
   "logging": false,
   "useUnifiedTopology": true,
   "connectTimeout": 5000,
   "entities": [
      "src/database/models/*.ts"
   ],
   "migrations": [
      "src/database/migration/*.ts"
   ],
   "subscribers": [
      "src/database/subscriber/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/database/models",
      "migrationsDir": "src/database/migration",
      "subscribersDir": "src/database/subscriber"
   }
}
