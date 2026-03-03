import { Carrier, CarrierUser } from "../../entities/entity";
import { AddUserToCarrierPayload, CreateOrUpdateCarrier } from "../../interfaces/interfaces";

export abstract class CarrierProvider {
    abstract createCarrier(payload: CreateOrUpdateCarrier): Promise<Carrier>;
    abstract getCarriers(): Promise<Carrier[]>;
    abstract getCarrierById(id: Carrier['id']): Promise<Carrier>;
    abstract getCarrierByCode(code: Carrier['code']): Promise<Carrier>;
    abstract addUserToCarrier(payload: AddUserToCarrierPayload): Promise<CarrierUser>
}