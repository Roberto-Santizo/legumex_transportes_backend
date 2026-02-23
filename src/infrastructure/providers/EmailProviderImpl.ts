import { EmailProvider } from "../../domain/providers/providers";
import { MailtrapTransport } from "mailtrap";
import { RegisterTokenTemplate } from "../../email/email";
import { User } from "../../entities/entity";
import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

export class EmailProviderImpl implements EmailProvider {

    private mailtrapClient: Transporter;

    constructor() {
        this.mailtrapClient = nodemailer.createTransport(
            MailtrapTransport({
                token: process.env.EMAIL_TOKEN || '',
                sandbox: true,
                testInboxId: parseInt(process.env.TEST_INBOX_ID || '0', 10),
            })
        );
    }

    async sendRegisterTokenEmail(user: User, token: string): Promise<void> {
        await this.mailtrapClient.sendMail({
            from: { address: "hello@example.com", name: "Mailtrap Test" },
            to: [user.email],
            subject: "Verificación de Registro",
            html: RegisterTokenTemplate.build(user, token),
        });
    }
}