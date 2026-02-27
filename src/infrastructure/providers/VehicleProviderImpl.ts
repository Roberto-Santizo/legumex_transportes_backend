import { CreateOrUpdateVehicle } from "../../interfaces/interfaces";
import { datasource } from "../../config/config";
import { FindOptionsSelect, Repository } from "typeorm";
import { Vehicle, VehicleBrand } from "../../entities/entity";
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
    getVehicles(id: VehicleBrand['id']): Promise<Vehicle[]> {
        return this.repo.find({ select: this.fields, where: { brand: { id: id } } });
    }

    createVehicle(payload: CreateOrUpdateVehicle): Promise<Vehicle> {
        return this.repo.save(payload);
    }

}