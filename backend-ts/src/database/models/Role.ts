import {BaseEntity, Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";

@Entity('roles')
export class Role extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({nullable: false})
  name: string;
}