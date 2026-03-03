import { CreateTokenPayload } from "../interfaces/interfaces";
import { Dates } from "../shared/shared";
import { AuthProviderImpl, EmailProviderImpl } from "../infrastructure/providers/providers";
import { AuthService, EmailService } from "./services";
import { getFourDigitToken } from "../utils/shared";
import { ConflictError, NotFoundError } from "../infrastructure/errors/errors";
import { Token } from "../entities/entity";
import { TokenProvider } from "../domain/providers/providers";

export class TokenService {
    constructor(private service: TokenProvider) { }

    async createToken(payload: CreateTokenPayload) {
        return this.service.createToken(payload);
    }

    async verifyToken(token: Token['token']) {
        const exists = await this.service.getToken(token);
        if (!exists) throw new NotFoundError('El token ingresado no es válido');

        if (exists.expiresAt < new Date()) {
            await this.service.deleteToken(exists.token);

            const emailProvider = new EmailProviderImpl();
            const emailService = new EmailService(emailProvider);

            const fourDigitToken = getFourDigitToken();
            const now = Dates.getCurrentDatePlus(1);
            const user = exists.user;

            const token = await this.service.createToken({ user: user, token: fourDigitToken, expiresAt: now });

            await emailService.sendRegisterTokenEmail(user, token.token);

            throw new ConflictError("El token ha expirado, se han mandado nuevas instrucciones a su correo eléctronico");
        }

        const authProvider = new AuthProviderImpl();
        const authService = new AuthService(authProvider);
        await authService.verifyUser(exists.user.id);
        await this.service.deleteToken(exists.token);

        return this.service.getToken(token);
    }
}