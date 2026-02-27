import { Vehicle, VehicleBrand } from "../../entities/entity";
import { CreateOrUpdateVehicle } from "../../interfaces/interfaces";

export abstract class VehicleProvider {
    abstract createVehicle(payload: CreateOrUpdateVehicle): Promise<Vehicle>;
    abstract getVehicles(id: VehicleBrand['id']): Promise<Vehicle[]>;
}