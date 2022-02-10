import { Oauth } from 'src/entity/oauth.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Oauth)
export class OauthRepository extends Repository<Oauth> {}
