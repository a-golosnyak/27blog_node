import { connect } from '../utils/db';
const mongoose = require('mongoose');

(async () => {
  await connect();

  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();

  console.log(
    collections.map(item => {
      return item.name;
    })
  );

  collections
    .map(collection => collection.name)
    .forEach(async collectionName => {
      db.dropCollection(collectionName);
    });

  console.log('Database cleared!');
  process.exit();
})();
