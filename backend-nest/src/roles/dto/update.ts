import {ApiProperty} from "@nestjs/swagger";

export class update {
  @ApiProperty({
      required: true,
      description: 'Role of user',
      example: 'Admin'
  })
  name: string;
}