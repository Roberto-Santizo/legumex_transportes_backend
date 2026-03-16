import { errorHandler, responseHandler } from "../helpers/httpHelpers";
import { PlaceProviderImpl } from "../infrastructure/providers/providers";
import { PlaceResource } from "../resources/resources";
import { PlaceService } from "../services/services";
import { Request, Response } from "express";
import apiClient from "../config/axios";

export abstract class PlaceController {
    static async index(req: Request<{}, {}, {}>, res: Response) {
        try {
            const { place } = req.query;
            const provider = new PlaceProviderImpl(apiClient);
            const service = new PlaceService(provider);
            const data = await service.getPlaces(`${place}`);

            responseHandler(res, 200, 'Lugares obtenidos correctamente', PlaceResource.collection(data));
        } catch (error) {
            errorHandler(error, res);
        }
    }
}