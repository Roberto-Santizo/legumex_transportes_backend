import { Carrier, User } from "../entities/entity";
import { CarrierProvider, ImageSaverProvider } from "../domain/providers/providers";
import { AddUserToCarrierPayload, CreateOrUpdateCarrier } from "../interfaces/interfaces";
import { NotFoundError } from "../infrastructure/errors/NotFoundError";

export class CarrierService {
    constructor(private service: CarrierProvider, private imageService?: ImageSaverProvider) { }

    async createCarrier(user: User, payload: CreateOrUpdateCarrier) {
        if (payload.image && this.imageService) {
            const imageUrl = await this.imageService.saveImage({ image: payload.image, path: 'carriers' });
            payload.image = imageUrl;
        }

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
}