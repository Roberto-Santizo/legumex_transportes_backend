import { AIProvider } from '../../domain/providers/AIProvider';
import { FuelProvider } from '../../domain/providers/FuelProvider';

export class FuelProviderImpl implements FuelProvider {
    constructor(private ia: AIProvider) { }

    getCurrentFuelPrices(): Promise<void> {
        return this.ia.getCurrentFuelPrices();
    }
}