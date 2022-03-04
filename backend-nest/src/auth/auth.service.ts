import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import { create as CreateUserDto} from '../users/dto/create'
import {UserService} from "../users/user.service";
import * as bcrypt from 'bcryptjs'
import {UserDocument} from "../users/user.schema";

@Injectable()
export class AuthService {

    constructor(private userService: UserService,
                private jwtService: JwtService) {}

    async login(dto: CreateUserDto) {
        const user = await this.validateUser(dto);
        return this.generateToken(user)
    }

    async register(dto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(dto.email);
        console.log(dto.email);
        console.log(candidate);

        if(candidate) {
            throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(dto.password, 2);
        const user = await this.userService.create({...dto, password: hashPassword});
        return this.generateToken(user)
    }

    private async generateToken(user) {
        const payload = { email: user.email, id: user.id };
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(dto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(dto.email);
        if (user) {
            const passwordEquals = await bcrypt.compare(dto.password, user.password);
            if (passwordEquals) {
                return user;
            }
        }
        throw new UnauthorizedException({ message: 'User not exist' });
    }
}
