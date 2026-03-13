import { ZoneTripPrice } from '../entities/ZoneTripPrice';

export class ZoneTripPriceResource {
    static toJson(price: ZoneTripPrice) {
        return {
            id: price.id,
            product: price.crop.name,
            fuel_price: price.fuelPrice.fuel_range,
            price_per_lb: price.price_per_lb
        }
    }


    static collection(prices: ZoneTripPrice[]) {
        return prices.map(price => this.toJson(price));
    }
}