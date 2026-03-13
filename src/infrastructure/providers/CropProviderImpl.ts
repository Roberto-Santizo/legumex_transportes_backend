import { CreateOrUpdateCrop } from "../../interfaces/interfaces";
import { Crop } from "../../entities/Crop";
import { CropProvider } from "../../domain/providers/providers";
import { Repository } from "typeorm";
import appDatasource from "../../config/datasource";

export class CropProviderImpl implements CropProvider {
    private service: Repository<Crop>

    constructor() {
        this.service = appDatasource.getRepository(Crop);
    }
    getCropById(id: Crop["id"]): Promise<Crop> {
        return this.service.findOneBy({ id: id });
    }

    getCrops(): Promise<Crop[]> {
        return this.service.find();
    }

    createCrop(payload: CreateOrUpdateCrop): Promise<Crop> {
        return this.service.save(payload);
    }

}