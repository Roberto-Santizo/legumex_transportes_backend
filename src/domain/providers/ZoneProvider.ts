import { DeleteResult } from "typeorm";
import { Zone } from "../../entities/entity";
import { CreateOrUpdateZone } from "../../interfaces/interfaces";

export abstract class ZoneProvider {
    abstract createZone(payload: CreateOrUpdateZone): Promise<Zone>;
    abstract getZones(): Promise<Zone[]>;
    abstract getZoneById(id: Zone['id']): Promise<Zone>;
    abstract deleteZoneById(id: Zone['id']): Promise<DeleteResult>;
}