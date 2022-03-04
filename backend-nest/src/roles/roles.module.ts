import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Role, RoleSchema} from "./roles.schema";
import {RolesController} from "./roles.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Role.name, schema: RoleSchema}])
    ],
    controllers: [RolesController],
    providers: []
})
export class RolesModule {}
