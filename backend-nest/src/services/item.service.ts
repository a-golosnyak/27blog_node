// import {Model} from "mongoose";
import {Injectable} from "@nestjs/common";
// import {InjectModel} from "@nestjs/mongoose";
// import {Item, ItemDocument} from "../models/item.schema";
// import {CreateItemDto} from '../dto/item/create.dto'

@Injectable()
export class ItemService {
    // constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}
    // // constructor(@InjectConnection() private connection: Connection) {}
    //
    // async create(createItemDto: CreateItemDto): Promise<Item> {
    //     const createItem = new this.itemModel(createItemDto);
    //     return createItem.save();
    // }
    //
    // async findAll(): Promise<Item[]> {
    //     return this.itemModel.find().exec();
    // }

}