import { errorHandler, responseHandler } from "../helpers/httpHelpers";
import { Fuel } from "../entities/entity";
import { FuelPriceProviderImpl } from "../infrastructure/providers/FuelPriceProviderImpl";
import { FuelProviderImpl } from "../infrastructure/providers/FuelProviderImpl";
import { FuelService } from "../services/FuelService";
import { Request, Response } from "express";
import { FuelResource } from '../resources/FuelResource';

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

    static async addPrice(req: Request<{ id: Fuel['id'] }, {}, { price: number }>, res: Response) {
        try {
            const provider = new FuelProviderImpl();
            const fuelPriceProvider = new FuelPriceProviderImpl();
            const service = new FuelService(provider, fuelPriceProvider);
            await service.addFuelPrice(req.params.id, req.body.price);

            responseHandler(res, 200, 'Precios de gasolina agregado correctamente');
        } catch (error) {
            errorHandler(error, res);
        }
    }
    static async get(req: Request<{ id: Fuel['id'] }, {}, { price: number }>, res: Response) {
        try {
            const provider = new FuelProviderImpl();
            const service = new FuelService(provider);
            const fuel = await service.getFueltypeById(req.params.id);

            responseHandler(res, 200, 'Precios de gasolina agregado correctamente', FuelResource.fuelDetails(fuel));
        } catch (error) {
            errorHandler(error, res);
        }
    }
}