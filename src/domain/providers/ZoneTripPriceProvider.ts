import { Zone, ZoneTripPrice } from "../../entities/entity";
import { CreateOrUpdateZoneTripPrice } from "../../interfaces/interfaces";

export abstract class ZoneTripPriceProvider {
    abstract createZoneTripPrice(payload: CreateOrUpdateZoneTripPrice): Promise<ZoneTripPrice>;
    abstract getZoneTripPrices(id: Zone['id']): Promise<ZoneTripPrice[]>;
}