import { CreateTokenPayload } from '../../interfaces/interfaces';
import { DeleteResult } from 'typeorm/browser';
import { Repository } from 'typeorm';
import { Token } from '../../entities/entity';
import { TokenProvider } from '../../domain/providers/providers';
import appDatasource from '../../config/datasource';

export class TokenProviderImpl implements TokenProvider {
    private repo: Repository<Token>;

    constructor() {
        this.repo = appDatasource.getRepository(Token);
    }

    deleteToken(token: Token['token']): Promise<DeleteResult> {
        return this.repo.delete({ token: token });
    }

    getToken(token: Token['token']): Promise<Token> {
        return this.repo.findOneBy({ token: token });
    }

    async createToken(payload: CreateTokenPayload) {
        return this.repo.save(payload);
    }
}