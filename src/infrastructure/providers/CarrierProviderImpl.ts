import { Carrier } from "../../entities/Carrier";
import { CarrierProvider } from "../../domain/providers/providers";
import { AddUserToCarrierPayload, CreateOrUpdateCarrier } from "../../interfaces/interfaces";
import { datasource } from "../../config/config";
import { Repository } from "typeorm";
import { CarrierUser } from "../../entities/entity";

export class CarrierProviderImpl implements CarrierProvider {
    private repo: Repository<Carrier>;
    private carrierUserRepo: Repository<CarrierUser>;

    constructor() {
        this.repo = datasource.getRepository(Carrier);
        this.carrierUserRepo = datasource.getRepository(CarrierUser);
    }
    getCarrierByCode(code: Carrier["code"]): Promise<Carrier> {
        return this.repo.findOneBy({ code: code });
    }

    addUserToCarrier(payload: AddUserToCarrierPayload): Promise<CarrierUser> {
        return this.carrierUserRepo.save(payload);
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