import { UpdateResult } from "typeorm";
import { Fuel, FuelPrice } from "../../entities/entity";

export abstract class FuelPriceProvider {
    abstract createFuelPrice(fuel: Fuel, price: number): Promise<FuelPrice>;
    abstract getActiveFuelPrice(id: Fuel['id']): Promise<FuelPrice>;
    abstract updateActiveFuelPrice(id: FuelPrice['id']): Promise<UpdateResult>;
}