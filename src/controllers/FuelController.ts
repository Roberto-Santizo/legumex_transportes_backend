import { Request, Response } from "express";
import { errorHandler, responseHandler } from "../helpers/httpHelpers";
import { FuelProviderImpl } from "../infrastructure/providers/FuelProviderImpl";
import { FuelService } from "../services/FuelService";

export abstract class FuelController {
    static async store(req: Request<{}, { name: string }>, res: Response) {
        try {
            const provider = new FuelProviderImpl();
            const service = new FuelService(provider);
            await service.createFuel(req.body.name);
            responseHandler(res, 200, 'Tipo de gasolina creado correctamente');
        } catch (error) {
            errorHandler(error, res);
        }
    }

    static async index(req: Request, res: Response) {
        try {
            const provider = new FuelProviderImpl();
            const service = new FuelService(provider);
            const fuelTypes = await service.getFuelTypes();
            responseHandler(res, 200, 'Tipos de gasolina obtenidos correctamente', fuelTypes);
        } catch (error) {
            errorHandler(error, res);
        }
    }
}