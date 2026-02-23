import { EmailProvider } from "../domain/providers/providers";
import { User } from "../entities/entity";

export class EmailService {
    private emailProvider: EmailProvider;

    constructor(emailProvider: EmailProvider) {
        this.emailProvider = emailProvider;
    }

    async sendRegisterTokenEmail(user: User, token: string): Promise<void> {
        await this.emailProvider.sendRegisterTokenEmail(user, token);
    }
}