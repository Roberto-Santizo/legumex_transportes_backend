import { CreateTokenPayload } from "../../interfaces/interfaces";
import { DeleteResult } from "typeorm";
import { Token } from "../../entities/entity";

export abstract class TokenProvider {
    abstract createToken(payload: CreateTokenPayload): Promise<Token>;
    abstract getToken(token: Token['token']): Promise<Token>;
    abstract deleteToken(token: Token['token']): Promise<DeleteResult>;
}