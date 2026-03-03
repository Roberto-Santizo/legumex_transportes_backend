import { CarrierProviderImpl, ImageSaverProviderImpl } from "../infrastructure/providers/providers";
import { CarrierService } from "../services/CarrierService";
import { CreateOrUpdateCarrier } from "../interfaces/interfaces";
import { DriverResource } from "../resources/DriverResource";
import { errorHandler, responseHandler } from "../helpers/httpHelpers";
import { ImageSaverService } from "../services/services";
import { Request, Response } from "express";

export abstract class CarrierController {
    static async store(req: Request<{}, {}, CreateOrUpdateCarrier>, res: Response) {
        try {
            const provider = new CarrierProviderImpl();
            const ImageProvider = new ImageSaverProviderImpl();
            const imageService = new ImageSaverService(ImageProvider);

            const service = new CarrierService(provider, imageService);
            await service.createCarrier(req.user, req.body);

            responseHandler(res, 201, 'Transportista creado correctamente');
        } catch (error) {
            errorHandler(error, res);
        }
    }

    static async index(req: Request, res: Response) {
        try {
            const provider = new CarrierProviderImpl();
            const service = new CarrierService(provider);
            const response = await service.getCarriers();

            responseHandler(res, 201, 'Transportistas Obtenidos Correctamente', response);
        } catch (error) {
            errorHandler(error, res);
        }
    }

    static async get(req: Request<{ id: number }>, res: Response) {
        try {
            const provider = new CarrierProviderImpl();
            const service = new CarrierService(provider);
            const carrier = await service.getCarrierById(req.params.id);

            responseHandler(res, 200, 'Transportista obtenido correctamente', carrier);
        } catch (error) {
            errorHandler(error, res);
        }
    }

    static async addDriverToCarrier(req: Request<{}, {}, { code: string }>, res: Response) {
        try {
            const provider = new CarrierProviderImpl();
            const service = new CarrierService(provider);
            await service.addUserToCarrier(req.user, req.body.code);

            responseHandler(res, 200, 'Piloto agregado correctamente');
        } catch (error) {
            errorHandler(error, res);
        }
    }

    static async getDriversByCarrierCode(req: Request<{ code: string }, {}, {}>, res: Response) {
        try {
            const provider = new CarrierProviderImpl();
            const service = new CarrierService(provider);
            const drivers = await service.getDriversByCarrierCode(req.params.code);

            responseHandler(res, 200, 'Pilotos obtenidos correctamente', DriverResource.collection(drivers));
        } catch (error) {
            errorHandler(error, res);
        }
    }
}