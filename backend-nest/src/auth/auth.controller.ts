import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import { create as CreateUserDto} from '../users/dto/create'

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() dto: CreateUserDto) {
        return this.authService.login(dto)
    }

    @Post('/register')
    register(@Body() dto: CreateUserDto) {
        return this.authService.register(dto)
    }
}
