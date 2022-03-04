import {ApiProperty} from "@nestjs/swagger";

export class create {
  @ApiProperty({
      required: true,
      description: 'Role of user',
      example: 'Admin'
  })
  name: string;
}