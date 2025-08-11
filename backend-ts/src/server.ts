import config from "./config";
import { AppDataSource } from "./AppDataSource";
import { app } from "./app";

const start = async () => {
  try {
    console.log("--- Here process.env ------------------------");
    console.log(process.env.MONGO_CONNECTION_STRING);
    console.log("--- Here config.env ------------------------");
    console.log('MONGO_CONNECTION_STRING', config.MONGO_CONNECTION_STRING);
    console.log("------------------------------------");

    await AppDataSource.initialize()
      .then(() => {
        console.log('Data Source has been initialized!');

        app.listen(config.APP_PORT, () => {
          console.log(
            `🚀 Server ready at http://localhost:${config.APP_PORT}`
          );
        })
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });
  } catch (e) {
    console.log(e);
  }
}

start()
  .catch(err => {
    console.log(err)
  });
