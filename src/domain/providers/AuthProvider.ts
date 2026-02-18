import { User } from "../../entities/entity";
import { CreateUserPayload, LoginPayload } from "../../interfaces/interfaces";

export abstract class AuthProvider {
    abstract getUserByEmail(payload: LoginPayload): Promise<User>;
    abstract createUser(payload: CreateUserPayload): Promise<User>;
}