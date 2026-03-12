import { Crop } from "../../entities/entity";
import { CreateOrUpdateCrop } from "../../interfaces/interfaces";

export abstract class CropProvider {
    abstract createCrop(payload: CreateOrUpdateCrop): Promise<Crop>;
    abstract getCrops(): Promise<Crop[]>;
}