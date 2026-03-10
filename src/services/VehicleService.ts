import { CreateOrUpdateVehicle } from '../interfaces/interfaces';
import { ImageSaverProvider, VehicleProvider } from "../domain/providers/providers";
import { VehicleBrandProviderImpl } from "../infrastructure/providers/providers";
import { VehicleBrandService } from "./VehicleBrandService";
import { Vehicle, VehicleBrand } from '../entities/entity';
import { NotFoundError } from '../infrastructure/errors/errors';

export class VehicleService {
    constructor(private service: VehicleProvider, private imageService?: ImageSaverProvider) { }

    async createVehicle(payload: CreateOrUpdateVehicle) {
        const provider = new VehicleBrandProviderImpl();
        const vehicleBrandService = new VehicleBrandService(provider);
        const brand = await vehicleBrandService.getVehicleBrandById(payload.vehicle_brand_id);
        payload.brand = brand;

        const imageUrl = await this.imageService.saveImage({ image: payload.image, path: 'vehicles' });
        payload.image = imageUrl;

        const vehicle = await this.service.createVehicle(payload);
        return vehicle;
    }

    async getVehiclesByBrandId(id: VehicleBrand['id']){
        return await this.service.getVehiclesByBrandId(id);
    }

    async getVehicleById(id: Vehicle['id']){
        const vehicle = await this.service.getVehicleById(id);
        
        if(!vehicle) throw new NotFoundError('El vehiculo no existe');

        return vehicle;
    }

    async getVehicles(){
        return this.service.getVehicles();
    }
}