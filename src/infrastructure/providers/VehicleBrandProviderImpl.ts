import { CreateOrUpdateVehicleBrandPayload } from '../../interfaces/interfaces';
import { datasource } from '../../config/config';
import { Repository } from 'typeorm';
import { UpdateResult } from 'typeorm/browser';
import { VehicleBrand } from '../../entities/entity';
import { VehicleBrandProvider } from '../../domain/providers/providers';

export class VehicleBrandProviderImpl implements VehicleBrandProvider {
    private repo: Repository<VehicleBrand>;

    constructor() {
        this.repo = datasource.getRepository(VehicleBrand);
    }
    getVehicleBrandById(id: VehicleBrand['id']): Promise<VehicleBrand> {
        return this.repo.findOneBy({ id });
    }

    getAllVehicleBrands(): Promise<VehicleBrand[]> {
        return this.repo.find();
    }

    getVehicleBrandByName(name: string): Promise<VehicleBrand> {
        return this.repo.findOneBy({ name });
    }

    createVehicleBrand(payload: CreateOrUpdateVehicleBrandPayload): Promise<VehicleBrand> {
        return this.repo.save(payload);
    }
    updateVehicleBrandById(id: VehicleBrand['id'], payload: CreateOrUpdateVehicleBrandPayload): Promise<UpdateResult> {
        return this.repo.update(id, payload);
    }
}