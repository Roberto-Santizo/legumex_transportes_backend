export abstract class FuelProvider {
    abstract getCurrentFuelPrices(): Promise<void>;
}