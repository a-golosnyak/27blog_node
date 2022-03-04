import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ItemService} from "../../services/item.service";
import {CreateItemDto} from "../../dto/item/create.dto";
import {Item, ItemDocument} from "../../models/item.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Controller('/api')
export class ItemController {
    constructor(private itemService: ItemService) {}                                    // use service
    // constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}   // use Model

    @Get('/item')
    getAll(): Promise<Item[]> {
        return this.itemService.getAll();
    }

    // @Get('/item/:id')
    // getOne(@Param('id') id: string): Promise<Item> {
    //     return this.itemModel.findById(id).exec();
    // }
    //
    // @Post('/item')
    // async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    //     // const item = await this.itemService.create({
    //     //     name: 'Aaa',
    //     //     type: 'Bbbb',
    //     //     description: 'Ccccc'
    //     // });
    //     const createItem = new this.itemModel(createItemDto);
    //     await createItem.save();
    //
    //     return createItem;
    // }
}