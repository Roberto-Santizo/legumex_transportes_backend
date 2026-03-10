import { Carrier, CarrierUser, CarrierVehicle } from "../../entities/entity";
import { AddUserToCarrierPayload, AddVehicleToCarrierPayload, CreateOrUpdateCarrier } from "../../interfaces/interfaces";
import { UpdateResult } from "typeorm";

export abstract class CarrierProvider {
    abstract createCarrier(payload: CreateOrUpdateCarrier): Promise<Carrier>;
    abstract getCarriers(): Promise<Carrier[]>;
    abstract getCarrierById(id: Carrier['id']): Promise<Carrier>;
    abstract getCarrierByCode(code: Carrier['code']): Promise<Carrier>;
    abstract addUserToCarrier(payload: AddUserToCarrierPayload): Promise<CarrierUser>;
    abstract addVehicleToCarrier(payload: AddVehicleToCarrierPayload): Promise<CarrierVehicle>;
    abstract getCarrierVehicleByPlate(plate: CarrierVehicle['plate']): Promise<CarrierVehicle>;
    abstract getCarrierVehicleById(id: CarrierVehicle['id']): Promise<CarrierVehicle>;
    abstract getCarrierVehiclesByCarrier(carrier: Carrier): Promise<CarrierVehicle[]>;
    abstract getDriversByCarrier(carrier: Carrier): Promise<CarrierUser[]>;
    abstract updateCarrierVehicleStatus(vehicle: CarrierVehicle): Promise<UpdateResult>;
}