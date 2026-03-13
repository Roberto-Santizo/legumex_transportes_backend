import { CreateOrUpdateZoneTripPrice } from "../interfaces/interfaces";
import { CropProviderImpl, ZoneProviderImpl } from "../infrastructure/providers/providers";
import { errorHandler, responseHandler } from "../helpers/httpHelpers";
import { Request, Response } from "express";
import { Zone } from "../entities/entity";
import { ZoneService, CropService, ZoneTripPriceService } from "../services/services";
import { ZoneTripPriceProviderImpl } from "../infrastructure/providers/providers";
import { ZoneTripPriceResource } from "../resources/resources";

export abstract class ZoneTripPriceController {
    static async store(req: Request<{}, {}, CreateOrUpdateZoneTripPrice>, res: Response) {
        try {
            const provider = new ZoneTripPriceProviderImpl();
            const providerCrop = new CropProviderImpl();
            const zoneProvider = new ZoneProviderImpl();

            const zoneService = new ZoneService(zoneProvider);
            const cropService = new CropService(providerCrop);
            const service = new ZoneTripPriceService(provider, cropService, zoneService);

            await service.createZoneTripPrice(req.body);

            responseHandler(res, 201, 'Precio creado correctamente');
        } catch (error) {
            errorHandler(error, res);
        }
    }

    static async index(req: Request<{ zoneId: Zone['id'] }>, res: Response) {
        try {
            const provider = new ZoneTripPriceProviderImpl();
            const service = new ZoneTripPriceService(provider);

            const prices = await service.getZoneTripPrices(req.params.zoneId);

            responseHandler(res, 200, 'Precios obtenidos correctamente correctamente', ZoneTripPriceResource.collection(prices));
        } catch (error) {
            errorHandler(error, res);
        }
    }
}