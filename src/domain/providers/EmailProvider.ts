import { User } from "../../entities/entity";

export abstract class EmailProvider {
    abstract sendRegisterTokenEmail(user: User, token: string): Promise<void>;
}