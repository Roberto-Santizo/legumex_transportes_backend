import { ConflictError, NotFoundError } from "../infrastructure/errors/errors";
import { CreateOrUpdateVehicleBrandPayload } from "../interfaces/interfaces";
import { VehicleBrand } from "../entities/entity";
import { VehicleBrandProvider } from "../domain/providers/providers";

export class VehicleBrandService {
    constructor(private service: VehicleBrandProvider) { }

    async getVehicleBrandByName(name: string) {
        return await this.service.getVehicleBrandByName(name);
    }

    async createVehicleBrand(payload: CreateOrUpdateVehicleBrandPayload) {
        const brand = await this.getVehicleBrandByName(payload.name);
        if (brand) {
            throw new ConflictError('Ya existe una marca de vehículo con ese nombre');
        }
        return await this.service.createVehicleBrand(payload);
    }

    async getAllVehicleBrands() {
        return await this.service.getAllVehicleBrands();
    }

    async getVehicleBrandById(id: VehicleBrand['id']) {
        const vehicleBrand = await this.service.getVehicleBrandById(id);
        if (!vehicleBrand) {
            throw new NotFoundError('La marca de vehiculo no existe');
        }
        return vehicleBrand;
    }

    async updateVehicleBrandById(id: VehicleBrand['id'], payload: CreateOrUpdateVehicleBrandPayload) {
        const vehicleBrand = await this.getVehicleBrandById(id);

        const brand = await this.getVehicleBrandByName(payload.name);

        if (brand && brand.id !== vehicleBrand.id) {
            throw new ConflictError('Ya existe una marca de vehículo con ese nombre');
        }

        return this.service.updateVehicleBrandById(id, payload);
    }
}