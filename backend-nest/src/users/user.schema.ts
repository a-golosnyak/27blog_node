import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from 'mongoose';
import {Role} from "../roles/roles.schema";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({unique: true, required: true})
    email: string;

    @Prop()
    password: string;

    @Prop()
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
    role: Role
}

export const UserSchema = SchemaFactory.createForClass(User);