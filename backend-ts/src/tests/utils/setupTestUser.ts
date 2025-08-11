import { AuthService } from "../../services/AuthService";
import userFactory from '../../database/factories/UserFactory';
import {User} from "../../database/models/User";

export async function setupTestUser(role = "user") {
  const [user] = await userFactory.create({ role }, 1);
  const token = AuthService.newToken(user);
  return { user, token } as { user: User, token: string };
}
