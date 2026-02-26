import { CreateOrUpdateVehicle } from "../../interfaces/interfaces";
import { datasource } from "../../config/config";
import { FindOptionsSelect, Repository } from "typeorm";
import { Vehicle } from "../../entities/entity";
import { VehicleProvider } from "../../domain/providers/providers";

export class VehicleProviderImpl implements VehicleProvider {

    private repo: Repository<Vehicle>;

    private fields: FindOptionsSelect<Vehicle> = {
        id: true,
        name: true,
        autonomy: true,
        year: true,
        image: true,
    }

    constructor() {
        this.repo = datasource.getRepository(Vehicle);
    }
    getVehicles(): Promise<Vehicle[]> {
        return this.repo.find({ select: this.fields });
    }

    createVehicle(payload: CreateOrUpdateVehicle): Promise<Vehicle> {
        return this.repo.save(payload);
    }

}