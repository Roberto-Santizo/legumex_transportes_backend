export abstract class AIProvider {
    abstract getCurrentFuelPrices(): Promise<void>;
}