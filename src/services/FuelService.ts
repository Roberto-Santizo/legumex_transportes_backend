import { FuelProvider } from "../domain/providers/FuelProvider";

export class FuelService {
    constructor(private provider: FuelProvider) { }

    getFuelTypes() {
        return this.provider.getFuelTypes();
    }
    createFuel(name: string) {
        return this.provider.createFuel(name);
    }
}