import { CreateTokenPayload } from '../../interfaces/interfaces';
import { Repository } from 'typeorm';
import { Token } from '../../entities/entity';
import { TokenProvider } from '../../domain/providers/providers';
import appDatasource from '../../config/datasource';

export class TokenProviderImpl implements TokenProvider {
    private repo: Repository<Token>;

    constructor() {
        this.repo = appDatasource.getRepository(Token);
    }

    async createToken(payload: CreateTokenPayload) {
        return this.repo.save(payload);
    }
}