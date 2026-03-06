import { CarrierProvider } from "../../domain/providers/providers";
import { AddUserToCarrierPayload, AddVehicleToCarrierPayload, CreateOrUpdateCarrier } from "../../interfaces/interfaces";
import { datasource } from "../../config/config";
import { Repository } from "typeorm";
import { CarrierUser, Carrier, CarrierVehicle } from "../../entities/entity";

export class CarrierProviderImpl implements CarrierProvider {
    private repo: Repository<Carrier>;
    private carrierUserRepo: Repository<CarrierUser>;
    private carrierVehicleRepo: Repository<CarrierVehicle>

    constructor() {
        this.repo = datasource.getRepository(Carrier);
        this.carrierUserRepo = datasource.getRepository(CarrierUser);
        this.carrierVehicleRepo = datasource.getRepository(CarrierVehicle);
    }

    getCarrierVehicleByPlate(plate: CarrierVehicle["plate"]): Promise<CarrierVehicle> {
        return this.carrierVehicleRepo.findOneBy({ plate: plate });
    }

    addVehicleToCarrier(payload: AddVehicleToCarrierPayload): Promise<CarrierVehicle> {
        const { vehicle_id, ...rest } = payload;
        return this.carrierVehicleRepo.save(rest);
    }

    getDriversByCarrier(carrier: Carrier): Promise<CarrierUser[]> {
        return this.carrierUserRepo.find({ relations: ['user'], where: { carrier: { id: carrier.id }, function: 'driver' } })
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