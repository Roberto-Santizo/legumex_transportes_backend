import { Fuel } from "../../entities/entity";

export abstract class FuelProvider {
    abstract createFuel(name: string): Promise<Fuel>;
    abstract getFuelTypes(): Promise<Fuel[]>;
}