import { CreateOrUpdateCrop } from "../interfaces/interfaces";
import { CropProvider } from "../domain/providers/CropProvider";
import { Crop } from "../entities/entity";
import { NotFoundError } from "../infrastructure/errors/NotFoundError";

export class CropService {
    constructor(private service: CropProvider) { }

    createCrop(payload: CreateOrUpdateCrop) {
        return this.service.createCrop(payload);
    }

    getCrops() {
        return this.service.getCrops();
    }

    async getCropById(id: Crop['id']) {
        const crop = await this.service.getCropById(id);
        if (!crop) throw new NotFoundError('El producto no existe');
        return crop;
    }
}