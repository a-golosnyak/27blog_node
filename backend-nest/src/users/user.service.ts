import {Injectable, Param} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./user.schema";
import {Model} from "mongoose";
import {create as CreateUserDto} from './dto/create'
import {update as UpdateUserDto} from './dto/update'

@Injectable()
export class UserService {
    constructor (@InjectModel(User.name) private userModel: Model<UserDocument> ) {}

    async getAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async getOne(id: string): Promise<User> {
        return this.userModel.findById(id).exec();
    }

    async create(dto: CreateUserDto) {
        const user = new this.userModel(dto);
        await user.save();

        return user;
    }

    async update(dto: UpdateUserDto, id: string) {
        return this.userModel.findByIdAndUpdate(id, dto);
    }

    async delete(id: string) {
        return this.userModel.findByIdAndDelete(id);
    }

    async getUserByEmail(email: string) {
        const user = await this.userModel.find({email: email});
        return user[0]
    }
}
