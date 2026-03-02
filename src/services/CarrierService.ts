import { Carrier } from "../entities/entity";
import { CarrierProvider } from "../domain/providers/providers";
import { CreateOrUpdateCarrier } from "../interfaces/interfaces";
import { NotFoundError } from "../infrastructure/errors/NotFoundError";

export class CarrierService {
    constructor(private service: CarrierProvider) { }

    async createCarrier(payload: CreateOrUpdateCarrier) {
        return this.service.createCarrier(payload);
    }

    async getCarriers() {
        return this.service.getCarriers();
    }

    async getCarrierById(id: Carrier['id']) {
        const carrier = await this.service.getCarrierById(id);

        if (!carrier) throw new NotFoundError('El transportista no existe');

        return carrier;
    }
}