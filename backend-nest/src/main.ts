import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 3111;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}}`
    );
  });
}
start();
