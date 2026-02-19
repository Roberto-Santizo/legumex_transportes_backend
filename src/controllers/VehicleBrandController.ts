import { CreateOrUpdateVehicleBrandPayload } from "../interfaces/interfaces";
import { errorHandler, responseHandler } from "../helpers/httpHelpers";
import { Request, Response } from "express";
import { VehicleBrandProviderImpl } from "../infrastructure/providers/VehicleBrandProviderImpl";
import { VehicleBrandService } from "../services/VehicleBrandService";

export abstract class VehicleBrandController {
    static async store(req: Request<{}, {}, CreateOrUpdateVehicleBrandPayload>, res: Response) {
        try {
            const provider = new VehicleBrandProviderImpl();
            const service = new VehicleBrandService(provider);

            await service.createVehicleBrand(req.body);

            responseHandler(res, 201, 'Marca de vehículo creada exitosamente');
        } catch (error) {
            errorHandler(error, res);
        }
    }

    static async index(req: Request, res: Response) {
        try {
            const provider = new VehicleBrandProviderImpl();
            const service = new VehicleBrandService(provider);

            const response = await service.getAllVehicleBrands();

            responseHandler(res, 200, 'Marcas de vehículo obtenidas exitosamente', response);
        } catch (error) {
            errorHandler(error, res);
        }
    }

    static async get(req: Request<{ id: number }, {}, {}>, res: Response) {
        try {
            const provider = new VehicleBrandProviderImpl();
            const service = new VehicleBrandService(provider);

            const response = await service.getVehicleBrandById(req.params.id);

            responseHandler(res, 200, 'Marcas de vehículo obtenida exitosamente', response);
        } catch (error) {
            errorHandler(error, res);
        }
    }

    static async update(req: Request<{ id: number; }, {}, CreateOrUpdateVehicleBrandPayload>, res: Response) {
        try {
            const provider = new VehicleBrandProviderImpl();
            const service = new VehicleBrandService(provider);

            await service.updateVehicleBrandById(req.params.id, req.body);

            responseHandler(res, 200, 'Marca de vehículo actualizada exitosamente');
        } catch (error) {
            errorHandler(error, res);
        }
    }
}