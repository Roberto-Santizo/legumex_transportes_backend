import { AuthProviderImpl, EmailProviderImpl } from "../infrastructure/providers/providers";
import { AuthService, EmailService } from "../services/services";
import { CreateUserPayload, LoginPayload } from "../interfaces/interfaces";
import { errorHandler, responseHandler } from '../helpers/httpHelpers';
import { Request, Response } from "express";

export abstract class AuthController {
    static async login(req: Request<{}, {}, LoginPayload>, res: Response) {
        try {
            const provider = new AuthProviderImpl();
            const authService = new AuthService(provider);

            const response = await authService.login(req.body);

            responseHandler(res, 200, 'Sesión Iniciada Correctamente', response);
        } catch (error) {
            errorHandler(error, res);
        }
    }

    static async register(req: Request<{}, {}, CreateUserPayload>, res: Response) {
        try {
            const provider = new AuthProviderImpl();
            const emailProvider = new EmailProviderImpl();

            const authService = new AuthService(provider);
            const emailService = new EmailService(emailProvider);

            const user = await authService.register(req.body);
            
            await emailService.sendRegisterTokenEmail(user.email,'','1234');

            responseHandler(res, 201, 'Usuario Creado Correctamente');
        } catch (error) {
            errorHandler(error, res);
        }
    }

    static async checkStatus(req: Request, res: Response) {
        try {
            const provider = new AuthProviderImpl();
            const authService = new AuthService(provider);

            const response = await authService.checkStatus(req.user);

            responseHandler(res, 200, 'Token válido', response);
        } catch (error) {
            errorHandler(error, res);
        }
    }
}