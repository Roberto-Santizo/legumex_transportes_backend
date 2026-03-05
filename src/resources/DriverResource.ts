import { CarrierUser } from '../entities/CarrierUser';

export class DriverResource {
    static toJson(user: CarrierUser) {
        return {
            id: user.user.id,
            name: `${user.user.name}${user.user.lastName}`,
            email: user.user.email,
            status: user.status,
            profilePicture: user.user.profilePicture
        }
    }


    static collection(users: CarrierUser[]) {
        return users.map(user => this.toJson(user));
    }
}