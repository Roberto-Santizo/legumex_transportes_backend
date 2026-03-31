import { Repository } from 'typeorm';
import { FuelProvider } from '../../domain/providers/providers';
import { Fuel } from '../../entities/entity';
import appDatasource from '../../config/datasource';

export class FuelProviderImpl implements FuelProvider {
    private repo: Repository<Fuel>;

    constructor() {
        this.repo = appDatasource.getRepository(Fuel);
    }

    getFuelById(id: Fuel['id']): Promise<Fuel> {
        return this.repo.findOne({ where: { id }, relations: ['prices'] });
    }

    getFuelTypes(): Promise<Fuel[]> {
        return this.repo.find();
    }

    createFuel(name: string): Promise<Fuel> {
        return this.repo.save({ name });
    }
}