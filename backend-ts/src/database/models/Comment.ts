import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn
} from "typeorm";
import { ObjectId } from "mongodb";

@Entity('comments')
export class Comment extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column( {length: 200 })
  body: string;

  @Column()
  userId: ObjectId;

  @Column()
  postId: ObjectId;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({nullable: true})
  deletedAt?: Date;
}
