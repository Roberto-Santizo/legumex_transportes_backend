import { AuthProviderImpl } from "../infrastructure/providers/providers";
import { AuthService } from "../services/services";
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

            await authService.register(req.body);

            responseHandler(res, 201, 'Usuario Creado Correctamente');
        } catch (error) {
            errorHandler(error, res);
        }
    }
}