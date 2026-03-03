import { AddUserToCarrierPayload, CreateOrUpdateCarrier } from "../interfaces/interfaces";
import { Carrier, User } from "../entities/entity";
import { CarrierProvider, ImageSaverProvider } from "../domain/providers/providers";
import { getSixDigitToken } from "../utils/shared";
import { NotFoundError } from "../infrastructure/errors/NotFoundError";
import { ConflictError } from "../infrastructure/errors/ConflictError";

export class CarrierService {
    constructor(private service: CarrierProvider, private imageService?: ImageSaverProvider) { }

    async createCarrier(user: User, payload: CreateOrUpdateCarrier) {
        if (payload.image && this.imageService) {
            const imageUrl = await this.imageService.saveImage({ image: payload.image, path: 'carriers' });
            payload.image = imageUrl;
        }

        payload.code = `${getSixDigitToken()}`;

        const carrier = await this.service.createCarrier(payload);

        if (user.role == 'carrier') {
            const data: AddUserToCarrierPayload = { user: user, carrier: carrier, function: 'administrator' }
            await this.service.addUserToCarrier(data);
        }

        return carrier;
    }

    async getCarriers() {
        return this.service.getCarriers();
    }

    async getCarrierById(id: Carrier['id']) {
        const carrier = await this.service.getCarrierById(id);

        if (!carrier) throw new NotFoundError('El transportista no existe');

        return carrier;
    }

    async getCarrierByCode(code: Carrier['code']) {
        const carrier = await this.service.getCarrierByCode(code);

        if (!carrier) throw new NotFoundError('El transportista no existe');

        return carrier;
    }

    async addUserToCarrier(user: User, code: Carrier['code']) {
        if (user.role != 'driver') throw new ConflictError('El usuario debe de ser un piloto')

        const carrier = await this.getCarrierByCode(code);
        const data: AddUserToCarrierPayload = { user: user, carrier: carrier, function: 'driver' }
        await this.service.addUserToCarrier(data);
    }

    async getDriversByCarrierCode(code: Carrier['code']) {
        const carrier = await this.getCarrierByCode(code);
        return this.service.getDriversByCarrier(carrier);
    }
}