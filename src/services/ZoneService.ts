import { createGeoJson } from "../utils/location";
import { CreateOrUpdateZone } from "../interfaces/interfaces";
import { NotFoundError } from "../infrastructure/errors/NotFoundError";
import { Zone } from "../entities/entity";
import { ZoneProvider } from "../domain/providers/ZoneProvider";

export class ZoneService {
    constructor(private service: ZoneProvider) { }

    createZone(payload: CreateOrUpdateZone) {
        const area = createGeoJson(payload.coordinates);
        payload.area = area;
        return this.service.createZone(payload);
    }

    getZones() {
        return this.service.getZones();
    }

    async getZoneById(id: Zone['id']) {
        const zone = await this.service.getZoneById(id);
        if (!zone) throw new NotFoundError('La zona no existe');

        return zone;
    }

    async deleteZoneById(id: Zone['id']) {
        const zone = await this.getZoneById(id);
        return this.service.deleteZoneById(zone.id);
    }
}