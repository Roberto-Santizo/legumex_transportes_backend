import { CreateOrUpdateZoneTripPrice } from "../interfaces/interfaces";
import { ZoneTripPriceProvider } from '../domain/providers/ZoneTripPriceProvider';
import { CropService, ZoneService } from "./services";
import { Zone } from "../entities/entity";

export class ZoneTripPriceService {

    constructor(private service: ZoneTripPriceProvider, private serviceCrop?: CropService, private serviceZoneFuelPrice?: ZoneService) { }

    async createZoneTripPrice(payload: CreateOrUpdateZoneTripPrice) {
        const crop = await this.serviceCrop.getCropById(payload.crop_id);
        payload.crop = crop;
        const fuelPrice = await this.serviceZoneFuelPrice.getPrinceRangeById(payload.fuel_price_id);
        payload.fuelPrice = fuelPrice;

        return this.service.createZoneTripPrice(payload);
    }

    async getZoneTripPrices(id: Zone['id']){
        return this.service.getZoneTripPrices(id);
    }
}