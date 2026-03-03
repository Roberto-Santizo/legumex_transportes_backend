import { AuthProviderImpl, TokenProviderImpl } from "../infrastructure/providers/providers";
import { AuthService, TokenService } from "../services/services";
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

            const authService = new AuthService(provider);
            const user = await authService.register(req.body);
            const { carrier, password, isVerified, ...rest } = user;

            responseHandler(res, 201, 'Hemos enviado instrucciones a tu correo eléctronico', rest);
        } catch (error) {
            errorHandler(error, res);
        }
    }

    static async verifyToken(req: Request<{}, {}, { token: string }>, res: Response) {
        try {
            const tokenProvider = new TokenProviderImpl();
            const tokenService = new TokenService(tokenProvider);

            await tokenService.verifyToken(req.body.token);

            responseHandler(res, 201, 'Usuario verificado correctamente, inicie sesión');
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