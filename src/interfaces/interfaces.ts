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

//VEHICLE BRAND
export interface CreateOrUpdateVehicleBrandPayload {
    name: string;
}