import { FuelPriceProvider } from "../domain/providers/providers";
import { Fuel } from "../entities/entity";

export class FuelPriceService {
    constructor(private service: FuelPriceProvider) { }

    createFuelPrice(fuel: Fuel, price: number) {
        return this.service.createFuelPrice(fuel, price);
    }
}