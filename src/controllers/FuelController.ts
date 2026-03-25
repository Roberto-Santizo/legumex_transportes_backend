import { Request, Response } from "express";
import { errorHandler, responseHandler } from "../helpers/httpHelpers";
import { GeminiProviderImpl } from "../infrastructure/providers/GeminiProviderImpl";
import { FuelProviderImpl } from "../infrastructure/providers/FuelProviderImpl";
import { FuelService } from "../services/FuelService";

export abstract class FuelController {
    static async getCurrentPrices(req: Request, res: Response) {
        try {
            const ia = new GeminiProviderImpl();
            const provider = new FuelProviderImpl(ia);
            const service = new FuelService(provider);

            await service.getCurrentFuelPrices();

            responseHandler(res, 200, 'Precios de gasolina obtenidos correctamente');
        } catch (error) {
            errorHandler(error, res);
        }
    }
}