import faker from "@faker-js/faker";
import { MigrationInterface, QueryRunner } from "typeorm";
import { User } from "../models/User";
import { ObjectId } from "mongodb";
import { AppError } from "../../utils/AppError";

export class migration011647205583550 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const user = new User();
        user._id = new ObjectId('444444444444444444444444');
        user.firstName = faker.name.firstName();
        user.lastName = faker.name.lastName();
        user.age = faker.datatype.number({min: 10, max: 60});
        user.email = faker.internet.email(user.firstName, user.lastName);
        user.role = 'user'
        // user.password = AuthService.hashPassword(params?.password ?? '111');
        user.password = user.hashPassword('111');
        let result = await user.save();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        let userToDelete: User = await User.findOne({ where: { _id: new ObjectId('444444444444444444444444') } });

        if (userToDelete) {
            await User.softRemove(userToDelete);
        }
    }

}
