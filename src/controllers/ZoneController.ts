import { CreateOrUpdateZone } from "../interfaces/interfaces";
import { errorHandler, responseHandler } from "../helpers/httpHelpers";
import { Request, Response } from "express";
import { ZoneProviderImpl } from "../infrastructure/providers/ZoneProviderImpl";
import { ZoneResource } from '../resources/resources';
import { ZoneService } from "../services/ZoneService";

export abstract class ZoneController {
    static async store(req: Request<{}, {}, CreateOrUpdateZone>, res: Response) {
        try {
            const provider = new ZoneProviderImpl();
            const service = new ZoneService(provider);
            await service.createZone(req.body);

            responseHandler(res, 201, 'Zona Creada Correctamente');
        } catch (error) {
            errorHandler(error, res);
        }
    }

    static async index(req: Request, res: Response) {
        try {
            const provider = new ZoneProviderImpl();
            const service = new ZoneService(provider);
            const zones = await service.getZones();

            responseHandler(res, 201, 'Zonas Obtenidas Correctamente', ZoneResource.collection(zones));
        } catch (error) {
            errorHandler(error, res);
        }
    }

    static async get(req: Request<{ id: number }>, res: Response) {
        try {
            const provider = new ZoneProviderImpl();
            const service = new ZoneService(provider);
            const zone = await service.getZoneById(req.params.id);

            responseHandler(res, 201, 'Zona Obtenida Correctamente', ZoneResource.toJsonDetails(zone));
        } catch (error) {
            errorHandler(error, res);
        }
    }

    static async update(req: Request, res: Response) {
        res.send('update');
    }

    static async delete(req: Request<{ id: number }>, res: Response) {
        try {
            const provider = new ZoneProviderImpl();
            const service = new ZoneService(provider);
            await service.deleteZoneById(req.params.id);

            responseHandler(res, 201, 'Zona Eliminada Correctamente');
        } catch (error) {
            errorHandler(error, res);
        }
    }
}