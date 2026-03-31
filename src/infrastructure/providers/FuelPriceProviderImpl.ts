import { Repository, UpdateResult } from "typeorm";
import { FuelPriceProvider } from "../../domain/providers/FuelPriceProvider";
import { FuelPrice, Fuel } from "../../entities/entity";
import appDatasource from "../../config/datasource";

export class FuelPriceProviderImpl implements FuelPriceProvider {
    private repo: Repository<FuelPrice>;

    constructor() {
        this.repo = appDatasource.getRepository(FuelPrice);
    }

    updateActiveFuelPrice(id: FuelPrice["id"]): Promise<UpdateResult> {
        return this.repo.update({ id }, { isActive: false });
    }

    getActiveFuelPrice(id: Fuel["id"]): Promise<FuelPrice> {
        return this.repo.findOneBy({ fuel: { id }, isActive: true });
    }

    createFuelPrice(fuel: Fuel, price: number): Promise<FuelPrice> {
        return this.repo.save({ fuel, price, isActive: true, activatedAt: new Date(), createdAt: new Date() });
    }

}