import { TestUser } from 'src/entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(TestUser)
export class UserRepository extends Repository<TestUser> {}
