import { EstimatedTripCost } from "../../interfaces/interfaces";
import { Zone, ZoneFuelPrice, ZoneTripPrice, Crop, Trip } from '../../entities/entity';
import { CreateTripPayload } from "../../types/types";

export abstract class TripProvider {
    abstract getZoneByPosition(query: string): Promise<Zone>;
    abstract getZoneFuelPrice(zoneId: Zone['id'], range: number): Promise<ZoneFuelPrice>;
    abstract getPricePerLb(cropId: Crop['id'], zoneFuelPriceId: ZoneFuelPrice['id']): Promise<ZoneTripPrice>;
    abstract getEstimatedTripCost(): Promise<EstimatedTripCost>;
    abstract createTrip(payload: CreateTripPayload): Promise<Trip>;
}