import { CreateTripPayload } from '../../types/types';
import { EstimatedTripCost } from '../../interfaces/interfaces';
import { Repository } from 'typeorm';
import { TripProvider } from '../../domain/providers/providers';
import { Zone, ZoneTripPrice, Crop, ZoneFuelPrice, Trip } from '../../entities/entity';
import appDatasource from '../../config/datasource';

export class TripProviderImpl implements TripProvider {
    private zoneTripPriceRepo: Repository<ZoneTripPrice>;
    private zoneRepo: Repository<Zone>;
    private zoneFuelRepo: Repository<ZoneFuelPrice>;
    private tripRepo: Repository<Trip>;

    constructor() {
        this.zoneTripPriceRepo = appDatasource.getRepository(ZoneTripPrice);
        this.zoneRepo = appDatasource.getRepository(Zone);
        this.zoneFuelRepo = appDatasource.getRepository(ZoneFuelPrice);
        this.tripRepo = appDatasource.getRepository(Trip);
    }

    createTrip(payload: CreateTripPayload): Promise<Trip> {
        return this.tripRepo.save(payload);
    }

    getPricePerLb(cropId: Crop['id'], zoneFuelPriceId: ZoneFuelPrice['id']): Promise<ZoneTripPrice> {
        return this.zoneTripPriceRepo.findOneBy({ crop: { id: cropId }, fuelPrice: { id: zoneFuelPriceId } });
    }

    getZoneFuelPrice(zoneId: Zone['id'], range: number): Promise<ZoneFuelPrice> {
        return this.zoneFuelRepo.findOneBy({ zone: { id: zoneId }, fuel_range: range });
    }

    async getZoneByPosition(query: string): Promise<Zone> {
        const zone = await this.zoneRepo.createQueryBuilder('zone').where(query).getOne();
        return zone;
    }


    getEstimatedTripCost(): Promise<EstimatedTripCost> {
        throw new Error('Method not implemented.');
    }
}