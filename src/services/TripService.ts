import { CropService } from "./CropService";
import { EstimatedTripCost } from "../interfaces/interfaces";
import { CreateTripPayload, GetEstimatedTripPricePayload } from "../types/types";
import { NotFoundError } from "../infrastructure/errors/NotFoundError";
import { TraficResource } from "../resources/TraficResource";
import { TraficService } from "./TraficService";
import { TripProvider } from "../domain/providers/TripProvider";
import { User, Zone, ZoneFuelPrice } from "../entities/entity";

export class TripService {
    constructor(private provider: TripProvider, private cropService?: CropService, private traficService?: TraficService) { }

    async getZoneByPosition(lng: number, lat: number): Promise<Zone> {
        const query = `ST_Intersects(zone.area,ST_SetSRID(ST_Point(${lng}, ${lat}), 4326)::geography)`;
        const zone = await this.provider.getZoneByPosition(query);
        if (!zone) {
            throw new NotFoundError('No se encontró una zona para la posición especificada');
        }
        return zone;
    }

    async getZoneFuelPrice(zoneId: Zone['id'], range: number): Promise<ZoneFuelPrice> {
        const getZoneFuelPrice = await this.provider.getZoneFuelPrice(zoneId, range);
        if (!getZoneFuelPrice) {
            throw new NotFoundError('No se encontró el precio del combustible para la zona y rango especificados');
        }

        return getZoneFuelPrice;
    }

    async getPricePerLb(cropId: number, zoneFuelPriceId: number) {
        const getPricePerLb = await this.provider.getPricePerLb(cropId, zoneFuelPriceId);
        if (!getPricePerLb) {
            throw new NotFoundError('No se encontró el precio por libra para el cultivo y precio de combustible especificados');
        }
        return getPricePerLb;
    }

    async getEstimatedTripCost(data: GetEstimatedTripPricePayload): Promise<EstimatedTripCost> {
        const product = await this.cropService.getCropById(data.product_id);
        const zone = await this.getZoneByPosition(data.start_lng, data.start_lat);
        const zoneFuelPrice = await this.getZoneFuelPrice(zone.id, 40);
        const pricePerLb = await this.getPricePerLb(product.id, zoneFuelPrice.id);

        const trafic = await this.traficService.getEstimatedTimeInTrafic({ start_lat: data.start_lat, start_lng: data.start_lng, destination_lat: data.destination_lat, destination_lng: data.destination_lng });

        const response: EstimatedTripCost = {
            trafic: TraficResource.toJsonDetails(trafic),
            pricePerLb: pricePerLb.price_per_lb,
            amount: pricePerLb.price_per_lb * data.total_pounds
        }

        return response;
    }

    async createTrip(payload: CreateTripPayload, user: User) {
        payload.user = user;
        payload.carrier = user.carrier.carrier;
        return this.provider.createTrip(payload);
    }
}