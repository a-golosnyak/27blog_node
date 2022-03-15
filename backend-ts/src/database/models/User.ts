import {Entity, ObjectIdColumn, ObjectID, Column, BaseEntity} from "typeorm";

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

}
