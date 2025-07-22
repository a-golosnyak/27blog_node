import { ObjectId } from "mongodb";
import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";

@Entity('roles')
export class Role extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({nullable: false})
  name: string;
}
