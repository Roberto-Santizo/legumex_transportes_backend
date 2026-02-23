import { CreateTokenPayload } from "../interfaces/interfaces";
import { TokenProvider } from "../domain/providers/providers";

export class TokenService {
    constructor(private service: TokenProvider) { }

    async createToken(payload: CreateTokenPayload) {
        return this.service.createToken(payload);
    }
}