import { DeleteResult } from "typeorm";
import { Zone, ZoneFuelPrice } from "../../entities/entity";
import { AddPriceRangeToZone, CreateOrUpdateZone } from "../../interfaces/interfaces";

export abstract class ZoneProvider {
    abstract createZone(payload: CreateOrUpdateZone): Promise<Zone>;
    abstract getZones(): Promise<Zone[]>;
    abstract getZoneById(id: Zone['id']): Promise<Zone>;
    abstract deleteZoneById(id: Zone['id']): Promise<DeleteResult>;
    abstract addPriceRange(payload: AddPriceRangeToZone): Promise<ZoneFuelPrice>;
    abstract getPriceRangeById(id: ZoneFuelPrice['id']): Promise<ZoneFuelPrice>;
    abstract removePriceRage(id: ZoneFuelPrice['id']): Promise<DeleteResult>;
}