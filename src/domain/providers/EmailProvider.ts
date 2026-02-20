export abstract class EmailProvider {
    abstract sendRegisterTokenEmail(to: string, body: string, token: string): Promise<void>;
}