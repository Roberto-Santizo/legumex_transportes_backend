import { CarrierVehicle } from '../entities/entity';

export class CarrierVehicleResource {
    static toJson(vehicle: CarrierVehicle) {
        return {
            id: vehicle.id,
            plate: vehicle.plate,
            image: vehicle.image,
            vehicle: vehicle.vehicle.name,
            model: vehicle.vehicle.year,
            status: vehicle.status,
            kms: vehicle.total_kms.toFixed(2),
            fuelType: vehicle.fuel_type
        }
    }


    static collection(vehicles: CarrierVehicle[]) {
        return vehicles.map(vehicle => this.toJson(vehicle));
    }
}