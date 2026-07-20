import { Carrier, Crop, User, Vehicle, VehicleBrand, Zone, ZoneFuelPrice } from "../entities/entity";
import { TraficData } from "../types/types";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface CreateUserPayload {
    name: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

export interface JwtPayload {
    id: number;
    name: string;
    lastName: string;
    email: string;
    role: string;
}

//TOKEN
export interface CreateTokenPayload {
    token: string;
    user: User;
    expiresAt: string;
}

//VEHICLE BRAND
export interface CreateOrUpdateVehicleBrandPayload {
    name: string;
}

//VEHICLE
export interface CreateOrUpdateVehicle {
    name: string;
    image: string;
    year: string;
    autonomy: number;
    vehicle_brand_id: number;
    brand: VehicleBrand;
}

//CARRIER
export interface CreateOrUpdateCarrier {
    name: string;
    code: string;
    image?: string;
}

//CARRIER USER
export interface AddUserToCarrierPayload {
    user: User;
    carrier: Carrier;
    function: string;
}

//CARRIER VEHICLE
export interface AddVehicleToCarrierPayload {
    vehicle_id: Vehicle['id'];
    carrier: Carrier;
    vehicle: Vehicle;
    plate: string;
    image: string;
}

//ZONE
export type Coordinate = [number, number];


export interface CreateOrUpdateZone {
    name: string;
    area: Object;
    coordinates: Coordinate[];
}

export interface AddPriceRangeToZone {
    zone: Zone;
    fuel_range: number;
}

//TRIPS

export interface CreateOrUpdateZoneTripPrice {
    crop_id: Crop['id'];
    fuel_price_id: ZoneFuelPrice['id'];
    price_per_lb: number;
    start_date: string;
    crop: Crop;
    fuelPrice: ZoneFuelPrice;
}

export interface EstimatedTripCost {
    amount: number;
    pricePerLb: number;
}

//CROP
export interface CreateOrUpdateCrop {
    name: string;
}

//TRAFIC 
export interface RoutePayload {
    destination_lat: number;
    destination_lng: number;
    start_lat: number;
    start_lng: number;
}