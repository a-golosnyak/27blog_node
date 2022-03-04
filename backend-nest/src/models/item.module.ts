import { Module } from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {Item, ItemSchema} from "./item.schema";
import {ItemController} from "../controllers/api/item.controller";
import {ItemService} from "../services/item.service";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        MongooseModule.forFeature([{name: Item.name, schema: ItemSchema}])
    ],
    controllers: [ItemController],
    providers: [ItemService]
})

export class ItemModule {}
