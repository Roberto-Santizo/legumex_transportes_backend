import { CreateOrUpdateZone } from '../../interfaces/interfaces';
import { datasource } from '../../config/config';
import { Repository, DeleteResult } from 'typeorm';
import { Zone } from '../../entities/Zone';
import { ZoneProvider } from '../../domain/providers/ZoneProvider';

export class ZoneProviderImpl implements ZoneProvider {
    private service: Repository<Zone>;

    constructor() {
        this.service = datasource.getRepository(Zone);
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