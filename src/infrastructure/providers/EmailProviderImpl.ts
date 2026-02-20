import { EmailProvider } from "../../domain/providers/providers";
import { MailtrapTransport } from "mailtrap";
import { RegisterTokenTemplate } from "../../email/email";
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

    async sendRegisterTokenEmail(to: string, body: string, token: string): Promise<void> {
        await this.mailtrapClient.sendMail({
            from: { address: "hello@example.com", name: "Mailtrap Test" },
            to: [to],
            subject: "Verificación de Registro",
            text: "Congrats for sending test email with Mailtrap!",
            html: RegisterTokenTemplate.build(token),
        });
    }
}