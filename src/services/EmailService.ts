import { EmailProvider } from "../domain/providers/providers";

export class EmailService {
    private emailProvider: EmailProvider;

    constructor(emailProvider: EmailProvider) {
        this.emailProvider = emailProvider;
    }

    async sendRegisterTokenEmail(to: string, body: string, token: string): Promise<void> {
        await this.emailProvider.sendRegisterTokenEmail(to, body, token);
    }
}