import { User, VehicleBrand } from "../entities/entity";

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
    autonomy: number;
    vehicle_brand_id: number;
    brand: VehicleBrand;
}