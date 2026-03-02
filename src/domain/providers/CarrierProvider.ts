import { Carrier } from "../../entities/entity";
import { CreateOrUpdateCarrier } from "../../interfaces/interfaces";
import { UpdateResult } from 'typeorm';

export abstract class CarrierProvider {
    abstract createCarrier(payload: CreateOrUpdateCarrier): Promise<Carrier>;
    abstract getCarriers(): Promise<Carrier[]>;
    abstract getCarrierById(id: Carrier['id']): Promise<Carrier>;
}