import { Zone } from '../entities/entity';

export class ZoneResource {
    static toJsonDetails(zone: Zone) {
        return {
            id: zone.id,
            name: zone.name,
            coordinates: zone.area["coordinates"][0]
        }
    }

    static toJson(zone: Zone) {
        return {
            id: zone.id,
            name: zone.name,
        }
    }


    static collection(zones: Zone[]) {
        return zones.map(zone => this.toJson(zone));
    }
}