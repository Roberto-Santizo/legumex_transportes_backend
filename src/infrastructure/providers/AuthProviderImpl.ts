import { AuthProvider } from "../../domain/providers/providers";
import { CreateUserPayload, LoginPayload } from "../../interfaces/interfaces";
import { datasource } from "../../config/config";
import { Repository, UpdateResult } from "typeorm";
import { User } from "../../entities/entity";

export class AuthProviderImpl implements AuthProvider {
    private repo: Repository<User>;

    constructor() {
        this.repo = datasource.getRepository(User);
    }

    verifyUser(id: User["id"]): Promise<UpdateResult> {
        return this.repo.update({ id: id }, { isVerified: true });
    }

    async createUser(payload: CreateUserPayload): Promise<User> {
        return this.repo.save(payload);
    }

    async getUserByEmail(payload: LoginPayload): Promise<User> {
        return this.repo.findOneBy({ email: payload.email });
    }

    async getUserById(userId: User["id"]): Promise<User> {
        return this.repo.findOneBy({ id: userId });
    }
}