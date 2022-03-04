// import { List } from '../../models/list.model'
// import  faker  from 'faker'
// import userSeeder from "./userSeeder";
//
// export default class ListSeeder {
//     static async create(params = {}, qty = 1) {
//         let lists = [];
//         for (let i=0; i<qty; i++) {
//             let user = {};
//             if(!params.user) {
//                 user = await userSeeder.create({}, 1)
//             }
//             let list = await List.create({
//                 name: params.name || faker.hacker.noun(),
//                 description: params.description || faker.lorem.sentence(),
//                 createdBy: (params.user && params.user._id) || user[0]._id
//             });
//             lists.push(list);
//         }
//         return lists;
//     }
// }
//
//
