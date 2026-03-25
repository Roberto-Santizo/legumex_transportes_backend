import { FuelProvider } from "../domain/providers/FuelProvider";

export class FuelService {
    constructor(private provider: FuelProvider) { }

    getCurrentFuelPrices() {
        return this.provider.getCurrentFuelPrices();
    }
}