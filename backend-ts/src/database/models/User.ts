import {
    Entity,
    ObjectIdColumn,
    ObjectID,
    Column,
    BaseEntity,
    OneToMany,
    CreateDateColumn,
    PrimaryGeneratedColumn
} from "typeorm";
import {Post} from "./Post";
import {Role} from "./Role";

@Entity('users')
export class User extends BaseEntity{
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @Column((type) => Role)
    role: string

    // @OneToMany (
    //   type => Post,
    //     post => post.user,
    //   { onDelete: "CASCADE" }
    // )
    // posts: Post[];
}
