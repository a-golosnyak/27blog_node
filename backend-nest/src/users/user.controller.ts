import {Controller, Get, Param} from '@nestjs/common';
import {User} from "./user.schema";
import {UserService} from "./user.service";
import {Role} from "../roles/roles.schema";

@Controller('/api/user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/')
    getAll(): Promise<User[]> {
        return this.userService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<User> {
        return this.userService.getOne(id);
    }
}
