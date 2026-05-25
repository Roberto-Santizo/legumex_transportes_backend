import { errorHandler, responseHandler } from "../helpers/httpHelpers";
import { PlaceProviderImpl } from "../infrastructure/providers/providers";
import { PlaceResource } from "../resources/resources";
import { PlaceService } from "../services/services";
import { Request, Response } from "express";

export abstract class PlaceController {
    static async index(req: Request<{}, {}, {}>, res: Response) {
        try {
            const { place } = req.query;
            const provider = new PlaceProviderImpl();
            const service = new PlaceService(provider);
            const data = await service.getPlaces(`${place}`);

            responseHandler(res, 200, 'Lugares obtenidos correctamente', PlaceResource.collection(data));
        } catch (error) {
            errorHandler(error, res);
        }
    }

    static async getPlaceById(req: Request<{ placeId: string }, {}, {}>, res: Response) {
        try {
            const { placeId } = req.params;
            const provider = new PlaceProviderImpl();
            const service = new PlaceService(provider);
            const data = await service.getPlaceById(placeId);

            responseHandler(res, 200, 'Lugares obtenidos correctamente', PlaceResource.toJsonDetails(data, placeId));
        } catch (error) {
            errorHandler(error, res);
        }
    }


    static async getRoute(req: Request, res: Response) {
        try {
            const provider = new PlaceProviderImpl();
            const service = new PlaceService(provider);
            const data = await service.getRoute(req.body);
            responseHandler(res, 200, 'Ruta obtenida correctamente', PlaceResource.formatRoute(data));
        } catch (error) {
            errorHandler(error, res);
        }
    }
}