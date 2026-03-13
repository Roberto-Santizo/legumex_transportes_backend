import { createGeoJson } from "../utils/location";
import { AddPriceRangeToZone, CreateOrUpdateZone } from "../interfaces/interfaces";
import { NotFoundError } from "../infrastructure/errors/NotFoundError";
import { Zone, ZoneFuelPrice } from "../entities/entity";
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

    async addPriceRangeToZone(id: Zone['id'], payload: AddPriceRangeToZone) {
        const zone = await this.getZoneById(id);
        payload.zone = zone;
        return this.service.addPriceRange(payload);
    }

    async getPrinceRangeById(id: ZoneFuelPrice['id']) {
        const range = await this.service.getPriceRangeById(id);
        if (!range) throw new NotFoundError("El rango de precios no existe");

        return range;
    }

    async getFuelPricesByZoneId(id: Zone['id']){
        const zone = await this.getZoneById(id);
        return this.service.getFuelPricesByZoneId(zone);
    }

    async removePriceRange(id: ZoneFuelPrice['id']) {
        await this.getPrinceRangeById(id);
        return this.service.removePriceRage(id);
    }
}