import { Token } from "../../entities/entity";
import { CreateTokenPayload } from "../../interfaces/interfaces";

export abstract class TokenProvider {
    abstract createToken(payload: CreateTokenPayload): Promise<Token>;
}