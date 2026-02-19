import { CreateUserPayload, LoginPayload } from "../../interfaces/interfaces";
import { User } from "../../entities/entity";

export abstract class AuthProvider {
    abstract getUserByEmail(payload: LoginPayload): Promise<User>;
    abstract createUser(payload: CreateUserPayload): Promise<User>;
    abstract getUserById(userId: User['id']): Promise<User>;
}