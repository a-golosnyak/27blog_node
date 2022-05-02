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
import {rejects} from "assert";
import {webcrypto} from "crypto";
import bcrypt from 'bcryptjs'

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

    public hashPassword(password) {
        return bcrypt.hashSync(password, 8);
    }

    public checkPassword (password) {
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
