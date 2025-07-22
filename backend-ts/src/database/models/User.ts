import {
    Entity,
    ObjectIdColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
} from "typeorm";
import {Post} from "./Post";
import {Role} from "./Role";
import {rejects} from "assert";
import {webcrypto} from "crypto";
import bcrypt from 'bcryptjs'
import { ObjectId } from "mongodb";

@Entity('users')
export class User extends BaseEntity{
    @ObjectIdColumn()
    _id: ObjectId;

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

    // public async hashPassword(password) {
    //     return await new Promise((resolve, reject) => {
    //         bcrypt.hash(password, 8, (err, hash) => {
    //             if (err) {
    //                 reject(err);
    //             }
    //             console.log('----- hashPassword ------------------');
    //             console.log(hash);
    //
    //             resolve(hash);
    //         })
    //     })
    // }

    public hashPassword(password: string) {
        return bcrypt.hashSync(password, 8);
    }

    public checkPassword (password: string) {
        const passwordHash = this.password;
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, passwordHash, (err, same) => {
                if(err) {
                    return reject(err);
                }
                resolve(same);
            })
        })
    }
}
