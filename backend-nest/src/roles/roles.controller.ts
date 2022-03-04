import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Role, RoleDocument} from "./roles.schema";
import {create as CreateRoleDto} from './dto/create'
import {update as UpdateRoleDto} from './dto/update'

@Controller('api/roles')
export class RolesController {
    constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}   // use Model

    @Get('/')
    getAll(): Promise<Role[]> {
        return this.roleModel.find().exec();
    }
    @Get(':id')
    getOne(@Param('id') id: string): Promise<Role> {
        return this.roleModel.findById(id).exec();
    }

    @Post()
    async create(@Body() dto: CreateRoleDto): Promise<Role> {
        const createRole = new this.roleModel(dto);
        await createRole.save();
        return createRole;
    }

    @Put(':id')
    async update(@Body() dto: UpdateRoleDto, @Param('id') id: string): Promise<Role>  {
        return this.roleModel.findByIdAndUpdate(id, dto);
    }
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Role> {
        console.log(id);
        return this.roleModel.findByIdAndDelete(id)
    }
}
