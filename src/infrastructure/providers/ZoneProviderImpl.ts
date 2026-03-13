import { AddPriceRangeToZone, CreateOrUpdateZone } from '../../interfaces/interfaces';
import { datasource } from '../../config/config';
import { Repository, DeleteResult } from 'typeorm';
import { ZoneFuelPrice, Zone } from '../../entities/entity';
import { ZoneProvider } from '../../domain/providers/providers';

export class ZoneProviderImpl implements ZoneProvider {
    private service: Repository<Zone>;
    private fuelService: Repository<ZoneFuelPrice>

    constructor() {
        this.service = datasource.getRepository(Zone);
        this.fuelService = datasource.getRepository(ZoneFuelPrice);
    }

    getFuelPricesByZoneId(zone: Zone): Promise<ZoneFuelPrice[]> {
        return this.fuelService.find({ where: { zone: { id: zone.id } } });
    }
    getPriceRangeById(id: ZoneFuelPrice['id']): Promise<ZoneFuelPrice> {
        return this.fuelService.findOneBy({ id });
    }

    removePriceRage(id: ZoneFuelPrice['id']): Promise<DeleteResult> {
        return this.fuelService.delete({ id });
    }

    addPriceRange(payload: AddPriceRangeToZone): Promise<ZoneFuelPrice> {
        return this.fuelService.save(payload);
    }

    deleteZoneById(id: Zone['id']): Promise<DeleteResult> {
        return this.service.delete({ id })
    }

    getZoneById(id: Zone['id']): Promise<Zone> {
        return this.service.findOneBy({ id });
    }

    getZones(): Promise<Zone[]> {
        return this.service.find();
    }

    createZone(payload: CreateOrUpdateZone): Promise<Zone> {
        const { coordinates, ...rest } = payload;
        return this.service.save(rest);
    }

}