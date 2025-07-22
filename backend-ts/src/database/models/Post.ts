import { ObjectId } from "mongodb";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
} from "typeorm";
import { User } from "./User";

@Entity('posts')
export class Post extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ length: 80 })
  title: string;

  @Column( {length: 200 })
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @Column((type) => User)
  user: string

  // @Column({ nullable: false })
  // userId: number
}
