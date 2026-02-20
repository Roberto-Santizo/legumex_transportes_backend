import { AuthProvider } from "../domain/providers/providers";
import { ConflictError, NotFoundError } from "../infrastructure/errors/errors";
import { CreateUserPayload, LoginPayload } from "../interfaces/interfaces";
import { generateJWT } from "../utils/jwt";
import { hashPassword, checkPassword } from '../utils/auth';
import { User } from "../entities/entity";

export class AuthService {
    constructor(private authProvider: AuthProvider) { }

    async login(payload: LoginPayload) {
        const user = await this.authProvider.getUserByEmail(payload);

        if (!user) throw new NotFoundError("El usuario ingresado no existe");

        const checkedPasswordFlag = await checkPassword(payload.password, user.password);
        if (!checkedPasswordFlag) throw new ConflictError("Credenciales incorrectas");

        const jwt = generateJWT({ id: user.id, name: user.name, lastName: user.lastName, role: user.role, email: user.email });
        const data = { id: user.id, name: user.name, lastName: user.lastName, email: user.email, role: user.role, token: jwt }

        return data;
    }

    async register(payload: CreateUserPayload) {
        const user = await this.authProvider.getUserByEmail(payload);
        if (user) throw new ConflictError("El correo ya existe registrado");

        const auxPassword = await hashPassword(payload.password);
        payload.password = auxPassword;

        return this.authProvider.createUser(payload);
    }

    async getUserById(userId: User['id']) {
        const user = await this.authProvider.getUserById(userId);
        if (!user) throw new NotFoundError("Usuario no encontrado");

        return user;
    }

    async checkStatus(user: User) {
        const jwt = generateJWT({ id: user.id, name: user.name, lastName: user.lastName, role: user.role, email: user.email });
        const data = { id: user.id, name: user.name, lastName: user.lastName, email: user.email, role: user.role, token: jwt }

        return data;

    }
}