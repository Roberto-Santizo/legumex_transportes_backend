import { Repository } from "typeorm";
import { VehicleProvider } from "../../domain/providers/providers";
import { CreateOrUpdateVehicle } from "../../interfaces/interfaces";
import { Vehicle } from "../../entities/entity";
import { datasource } from "../../config/config";

export class VehicleProviderImpl implements VehicleProvider {

    private repo: Repository<Vehicle>;

    constructor() {
        this.repo = datasource.getRepository(Vehicle);
    }

    createVehicle(payload: CreateOrUpdateVehicle): Promise<Vehicle> {
        return this.repo.save(payload);
    }

}