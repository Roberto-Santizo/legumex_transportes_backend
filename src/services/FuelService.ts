import { FuelPriceProvider } from "../domain/providers/FuelPriceProvider";
import { FuelProvider } from "../domain/providers/FuelProvider";
import { Fuel } from "../entities/Fuel";
import { NotFoundError } from "../infrastructure/errors/NotFoundError";

export class FuelService {
    constructor(private provider: FuelProvider, private fuelPriceProvider?: FuelPriceProvider) { }

    async getFueltypeById(id: Fuel['id']) {
        const fuelType = await this.provider.getFuelById(id);
        if (!fuelType) throw new NotFoundError('El tipo de gasolina no existe');
        return fuelType;
    }

    getFuelTypes() {
        return this.provider.getFuelTypes();
    }

    createFuel(name: string) {
        return this.provider.createFuel(name);
    }

    async getActiveFuelPrice(id: Fuel['id']) {
        return this.fuelPriceProvider.getActiveFuelPrice(id);
    }

    async addFuelPrice(fuelId: Fuel['id'], price: number) {
        const fuel = await this.getFueltypeById(fuelId);
        const activePrice = await this.getActiveFuelPrice(fuelId);

        if (activePrice) await this.fuelPriceProvider.updateActiveFuelPrice(activePrice.id);

        return this.fuelPriceProvider.createFuelPrice(fuel, price);
    }
}