import { CreateOrUpdateVehicleBrandPayload } from "../../interfaces/interfaces";
import { UpdateResult } from "typeorm";
import { VehicleBrand } from "../../entities/entity";

export abstract class VehicleBrandProvider {
    abstract createVehicleBrand(payload: CreateOrUpdateVehicleBrandPayload): Promise<VehicleBrand>;
    abstract getVehicleBrandByName(name: string): Promise<VehicleBrand>;
    abstract getAllVehicleBrands(): Promise<VehicleBrand[]>;
    abstract getVehicleBrandById(id: VehicleBrand['id']): Promise<VehicleBrand>;
    abstract updateVehicleBrandById(id: VehicleBrand['id'], payload: CreateOrUpdateVehicleBrandPayload): Promise<UpdateResult>;
}