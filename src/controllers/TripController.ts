import { CropProviderImpl, TraficProviderImpl, TripProviderImpl } from "../infrastructure/providers/providers";
import { CropService } from "../services/CropService";
import { errorHandler, responseHandler } from "../helpers/httpHelpers";
import { CreateTripPayload, GetEstimatedTripPricePayload } from "../types/types";
import { Request, Response } from "express";
import { TraficService, TripService } from "../services/services";
import apiClient from "../config/axios";

export abstract class TripController {
    static async store(req: Request<{}, {}, CreateTripPayload>, res: Response) {
        try {
            const provider = new TripProviderImpl();
            const service = new TripService(provider);

            await service.createTrip(req.body, req.user);

            responseHandler(res, 200, 'Viaje creado correctamente');
        } catch (error) {
            errorHandler(error, res);
        }
    }

    static async getTripPrice(req: Request<{}, {}, GetEstimatedTripPricePayload>, res: Response) {
        try {
            const productProvider = new CropProviderImpl();
            const cropService = new CropService(productProvider);

            const traficProvider = new TraficProviderImpl(apiClient);
            const traficService = new TraficService(traficProvider);

            const provider = new TripProviderImpl();
            const service = new TripService(provider, cropService, traficService);

            const data = await service.getEstimatedTripCost(req.body);

            responseHandler(res, 200, 'Información obtenida correctamente', data);
        } catch (error) {
            errorHandler(error, res);
        }
    }
}