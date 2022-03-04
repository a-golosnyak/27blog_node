import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../../roles/roles.schema";

export class update {
    @ApiProperty({
        required: true,
        description: 'Email',
        example: 'aaa@gmail.com'
    })
    email: string;

    @ApiProperty({})
    password: string;

    @ApiProperty({
        description: 'User name',
        example: 'Aaa'
    })
    name: string;

    @ApiProperty({})
    roles: Role

}