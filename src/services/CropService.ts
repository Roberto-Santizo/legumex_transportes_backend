import { CreateOrUpdateCrop } from "../interfaces/interfaces";
import { CropProvider } from "../domain/providers/CropProvider";

export class CropService {
    constructor(private service: CropProvider) { }

    createCrop(payload: CreateOrUpdateCrop) {
        return this.service.createCrop(payload);
    }

    getCrops(){
        return this.service.getCrops();
    }
}