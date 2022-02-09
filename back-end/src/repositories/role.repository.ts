import { Role } from 'src/entity/role.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Role)
export class MemberRepository extends Repository<Role> {}
