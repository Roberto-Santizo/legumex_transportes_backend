import { CreateOrUpdateZoneTripPrice } from '../../interfaces/interfaces';
import { Repository } from 'typeorm';
import { Zone, ZoneTripPrice } from '../../entities/entity';
import { ZoneTripPriceProvider } from '../../domain/providers/providers';
import appDatasource from '../../config/datasource';

export class ZoneTripPriceProviderImpl implements ZoneTripPriceProvider {
    private service: Repository<ZoneTripPrice>;

    constructor() {
        this.service = appDatasource.getRepository(ZoneTripPrice);
    }

    createZoneTripPrice(payload: CreateOrUpdateZoneTripPrice): Promise<ZoneTripPrice> {
        const { crop_id, fuel_price_id, ...data } = payload;
        return this.service.save(data);
    }

    getZoneTripPrices(id: Zone['id']): Promise<ZoneTripPrice[]> {
        return this.service.find({ where: { fuelPrice: { zone: { id: id } } } });
    }

}