import { CreateOrUpdateVehicle } from "../interfaces/interfaces";
import { errorHandler, responseHandler } from "../helpers/httpHelpers";
import { ImageSaverProviderImpl } from "../infrastructure/providers/providers";
import { VehicleProviderImpl } from "../infrastructure/providers/providers";
import { Request, Response } from "express";
import { VehicleService } from "../services/services";

export abstract class VehicleController {
    static async store(req: Request<{}, {}, CreateOrUpdateVehicle>, res: Response) {
        try {
            const provider = new VehicleProviderImpl();
            const imageService = new ImageSaverProviderImpl();
            const service = new VehicleService(provider, imageService);
            await service.createVehicle(req.body);

            responseHandler(res, 201, 'Vehiculo creado correctamente');
        } catch (error) {
            errorHandler(error, res);
        }
    }

    static async index(req: Request<{ id: number }, {}, {}>, res: Response) {
        try {
            const provider = new VehicleProviderImpl();
            const imageService = new ImageSaverProviderImpl();
            const service = new VehicleService(provider, imageService);
            const vehicles = await service.getVehicles(req.params.id);

            responseHandler(res, 201, 'Vehiculo obtenidos exitosamente', vehicles);
        } catch (error) {
            errorHandler(error, res);
        }
    }

    static async update(req: Request, res: Response) {
        res.send('update');
    }

    static async delete(req: Request, res: Response) {
        res.send('delete');
    }
}