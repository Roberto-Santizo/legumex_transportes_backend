import { CreateOrUpdateVehicle } from "../interfaces/interfaces";
import { errorHandler, responseHandler } from "../helpers/httpHelpers";
import { ImageSaverProviderImpl } from "../infrastructure/providers/providers";
import { Request, Response } from "express";
import { VehicleProviderImpl } from "../infrastructure/providers/VehicleProviderImpl";
import { VehicleService } from "../services/VehicleService";

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

    static async index(req: Request, res: Response) {
        res.send('index');
    }

    static async get(req: Request, res: Response) {
        res.send('get');
    }

    static async update(req: Request, res: Response) {
        res.send('update');
    }

    static async delete(req: Request, res: Response) {
        res.send('delete');
    }
}