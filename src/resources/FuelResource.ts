import { Fuel, FuelPrice } from '../entities/entity';

export class FuelResource {
    static priceDetails(fuelPrice: FuelPrice) {
        return {
            id: fuelPrice.id,
            price: fuelPrice.price,
            isActive: fuelPrice.isActive,
            activatedAt: fuelPrice.activatedAt,
        }
    }

    static fuelDetails(fuel: Fuel) {
        return {
            id: fuel.id,
            name: fuel.name,
            prices: fuel.prices.map(price => this.priceDetails(price)),
        }
    }
}