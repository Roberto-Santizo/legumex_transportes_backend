import { User } from "../entities/entity";

export class UserResource {
    static userAuthenticated(user: User, jwt: string, refreshJwt: string) {
        return {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            profilePicture: user.profilePicture,
            token: jwt,
            refreshToken: refreshJwt,
            carrier: user.carrier ? {
                carrierId: user.carrier.id,
                function: user.carrier.function,
                carrierName: user.carrier.carrier.name,
                code: user.carrier.carrier.code
            } : null
        }
    }
}