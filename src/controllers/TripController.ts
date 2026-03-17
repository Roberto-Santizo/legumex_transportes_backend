import { errorHandler, responseHandler } from "../helpers/httpHelpers";
import { GetEstimatedTimeInTraficPayload } from "../interfaces/interfaces";
import { Request, Response } from "express";
import { TraficProviderImpl } from "../infrastructure/providers/providers";
import { TraficService } from "../services/services";
import { TraficResource } from '../resources/resources';
import apiClient from "../config/axios";

export abstract class TripController {
    static async getEstimatedTrafic(req: Request<{}, {}, GetEstimatedTimeInTraficPayload>, res: Response) {
        try {
            const provider = new TraficProviderImpl(apiClient);
            const service = new TraficService(provider);
            const data = await service.getEstimatedTimeInTrafic(req.body);

            responseHandler(res, 200, 'Información obtenida correctamente', TraficResource.toJsonDetails(data));
        } catch (error) {
            errorHandler(error, res);
        }
    }
}