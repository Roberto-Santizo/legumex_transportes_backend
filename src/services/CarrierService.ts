import { AddUserToCarrierPayload, AddVehicleToCarrierPayload, CreateOrUpdateCarrier } from "../interfaces/interfaces";
import { Carrier, CarrierVehicle, User } from "../entities/entity";
import { CarrierProvider, ImageSaverProvider } from "../domain/providers/providers";
import { getSixDigitToken } from "../utils/shared";
import { NotFoundError } from "../infrastructure/errors/NotFoundError";
import { ConflictError } from "../infrastructure/errors/ConflictError";
import { VehicleProviderImpl } from "../infrastructure/providers/providers";
import { VehicleService } from "./services";

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


    async getCarrierVehicleByPlate(plate: CarrierVehicle['plate']) {
        const vehicle = await this.service.getCarrierVehicleByPlate(plate);
        return vehicle;
    }

    async getCarrierVehicleById(id: CarrierVehicle['id']) {
        const vehicle = await this.service.getCarrierVehicleById(id);

        if (!vehicle) throw new NotFoundError('El vehículo no existe');

        return vehicle;
    }

    async addVehicleToCarrier(code: Carrier['code'], payload: AddVehicleToCarrierPayload) {
        const provider = new VehicleProviderImpl();
        const service = new VehicleService(provider);

        const vehicleExists = await this.getCarrierVehicleByPlate(payload.plate);
        if (vehicleExists) {
            throw new ConflictError('El número de placa ya fue agregada');
        }

        const vehicle = await service.getVehicleById(payload.vehicle_id);
        payload.vehicle = vehicle;

        const carrier = await this.getCarrierByCode(code);
        payload.carrier = carrier;

        if (payload.image && this.imageService) {
            const imageUrl = await this.imageService.saveImage({ image: payload.image, path: 'carrierVehicles' });
            payload.image = imageUrl;
        }

        return this.service.addVehicleToCarrier(payload);

    }

    async getDriversByCarrierCode(code: Carrier['code']) {
        const carrier = await this.getCarrierByCode(code);
        return this.service.getDriversByCarrier(carrier);
    }

    async getCarrierVehiclesByCarrier(code: Carrier['code']) {
        const carrier = await this.getCarrierByCode(code);
        return this.service.getCarrierVehiclesByCarrier(carrier);
    }

    async updateCarrierVehicleStatus(id: CarrierVehicle['id']) {
        const vehicle = await this.getCarrierVehicleById(id);
        return this.service.updateCarrierVehicleStatus(vehicle);
    }

}