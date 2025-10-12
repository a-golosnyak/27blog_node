import { ObjectId } from "mongodb";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectIdColumn,
} from "typeorm";

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

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  userId: ObjectId;

  @DeleteDateColumn({nullable: true})
  deletedAt?: Date;

  public isAuthor(userId: ObjectId): boolean {
    return this.userId.toString() === userId.toString();
  }
}
