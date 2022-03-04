import { Role } from '../../models/role.model'
import  faker  from 'faker'

export default class RoleSeeder {
    static async create(params = {}, qty = 1) {
        let roles = [];
        for (let i=0; i<qty; i++) {
            let role = await Role.create({
                name: params.hasOwnProperty('name') ? params.name : faker.lorem.word()
            });
            roles.push(role);
        }
        return roles;
    }
}


