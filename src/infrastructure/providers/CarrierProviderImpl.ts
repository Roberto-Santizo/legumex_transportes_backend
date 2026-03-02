import { Carrier } from "../../entities/Carrier";
import { CarrierProvider } from "../../domain/providers/providers";
import { CreateOrUpdateCarrier } from "../../interfaces/interfaces";
import { datasource } from "../../config/config";
import { Repository } from "typeorm";

export class CarrierProviderImpl implements CarrierProvider {
    private repo: Repository<Carrier>;

    constructor() {
        this.repo = datasource.getRepository(Carrier);
    }

    getCarrierById(id: Carrier["id"]): Promise<Carrier> {
        return this.repo.findOneBy({ id });
    }

    createCarrier(payload: CreateOrUpdateCarrier): Promise<Carrier> {
        return this.repo.save(payload);
    }

    getCarriers() {
        return this.repo.find();
    }
}