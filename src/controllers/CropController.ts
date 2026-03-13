import { CreateOrUpdateCrop } from "../interfaces/interfaces";
import { Crop } from "../entities/entity";
import { CropProviderImpl } from "../infrastructure/providers/CropProviderImpl";
import { CropService } from "../services/CropService";
import { errorHandler, responseHandler } from "../helpers/httpHelpers";
import { Request, Response } from "express";

export abstract class CropController {
    static async store(req: Request<{}, {}, CreateOrUpdateCrop>, res: Response) {
        try {
            const provider = new CropProviderImpl();
            const service = new CropService(provider);

            await service.createCrop(req.body);

            responseHandler(res, 201, 'Cultivo creado correctamente');
        } catch (error) {
            errorHandler(error, res);
        }
    }

    static async index(req: Request, res: Response) {
        try {
            const provider = new CropProviderImpl();
            const service = new CropService(provider);

            const crops = await service.getCrops();

            responseHandler(res, 200, 'Cultivos obtenidos correctamente', crops);
        } catch (error) {
            errorHandler(error, res);
        }
    }
}