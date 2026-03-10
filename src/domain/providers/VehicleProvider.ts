import { Vehicle, VehicleBrand } from "../../entities/entity";
import { CreateOrUpdateVehicle } from "../../interfaces/interfaces";

export abstract class VehicleProvider {
    abstract createVehicle(payload: CreateOrUpdateVehicle): Promise<Vehicle>;
    abstract getVehiclesByBrandId(id: VehicleBrand['id']): Promise<Vehicle[]>;
    abstract getVehicles(): Promise<Vehicle[]>;
    abstract getVehicleById(id: Vehicle['id']): Promise<Vehicle>;
}