import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ItemController } from "./controllers/api/item.controller";
import { MongooseModule } from '@nestjs/mongoose';
import {ItemService} from "./services/item.service";
import {ItemModule} from "./models/item.module";

@Module({
  imports: [
      MongooseModule.forRoot('mongodb://localhost:27018/api-design-nest'),
      ItemModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
