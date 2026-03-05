import { AuthProvider, ImageSaverProvider } from "../domain/providers/providers";
import { ConflictError, NotFoundError } from "../infrastructure/errors/errors";
import { CreateUserPayload, LoginPayload } from "../interfaces/interfaces";
import { Dates } from "../shared/shared";
import { EmailProviderImpl, TokenProviderImpl } from "../infrastructure/providers/providers";
import { EmailService, TokenService } from "./services";
import { generateJWT, generateRefreshJWT } from "../utils/jwt";
import { getFourDigitToken } from "../utils/shared";
import { hashPassword, checkPassword } from '../utils/auth';
import { User } from "../entities/entity";
import { UserResource } from "../resources/resources";

export class AuthService {
    constructor(private authProvider: AuthProvider) { }

    async login(payload: LoginPayload) {
        const user = await this.authProvider.getUserByEmail(payload);

        if (!user) throw new NotFoundError("El usuario ingresado no existe");

        if (!user.isVerified) throw new ConflictError('El usuario no esta verificado');

        const checkedPasswordFlag = await checkPassword(payload.password, user.password);
        if (!checkedPasswordFlag) throw new ConflictError("Credenciales incorrectas");

        const jwt = generateJWT(user);
        const refreshJwt = generateRefreshJWT(user);

        return UserResource.userAuthenticated(user, jwt, refreshJwt);
    }

    async register(payload: CreateUserPayload) {
        const exists = await this.authProvider.getUserByEmail(payload);
        if (exists) throw new ConflictError("El correo ya existe registrado");

        const auxPassword = await hashPassword(payload.password);
        payload.password = auxPassword;

        const emailProvider = new EmailProviderImpl();
        const emailService = new EmailService(emailProvider);

        const tokenProvider = new TokenProviderImpl();
        const tokenService = new TokenService(tokenProvider);

        const user = await this.authProvider.createUser(payload);
        const fourDigitToken = getFourDigitToken();
        const now = Dates.getCurrentDatePlus(1);

        const token = await tokenService.createToken({ user: user, token: fourDigitToken, expiresAt: now });

        await emailService.sendRegisterTokenEmail(user, token.token);

        return user;
    }

    async verifyUser(id: User['id']) {
        return this.authProvider.verifyUser(id);
    }

    async getUserById(userId: User['id']) {
        const user = await this.authProvider.getUserById(userId);
        if (!user) throw new NotFoundError("Usuario no encontrado");

        return user;
    }

    async checkStatus(user: User) {
        const jwt = generateJWT(user);
        const refreshJwt = generateRefreshJWT(user);

        return UserResource.userAuthenticated(user, jwt, refreshJwt);

    }

    async updateProfilePicture(user: User, image: string, imageService: ImageSaverProvider) {
        const imageUrl = await imageService.saveImage({ image: image, path: 'pfp' });
        return this.authProvider.updateProfilePic(user, imageUrl);
    }
}