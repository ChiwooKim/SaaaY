import { Oauth } from 'src/entity/oauth.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Oauth)
export class MemberRepository extends Repository<Oauth> {}
