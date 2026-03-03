import { User } from "../entities/entity";

export class UserResource {
    static userAuthenticated(user: User, jwt: string) {
        return {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            token: jwt,
            carrier: user.carrier ? {
                carrierId: user.carrier.id,
                function: user.carrier.function,
                carrierName: user.carrier.carrier.name
            } : null
        }
    }
}