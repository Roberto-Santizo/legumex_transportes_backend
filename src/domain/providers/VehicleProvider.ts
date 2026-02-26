import { Vehicle } from "../../entities/entity";
import { CreateOrUpdateVehicle } from "../../interfaces/interfaces";

export abstract class VehicleProvider {
    abstract createVehicle(payload: CreateOrUpdateVehicle): Promise<Vehicle>;
}