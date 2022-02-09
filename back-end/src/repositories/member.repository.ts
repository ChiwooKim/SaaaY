import { Member } from 'src/entity/member.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Member)
export class MemberRepository extends Repository<Member> {}
