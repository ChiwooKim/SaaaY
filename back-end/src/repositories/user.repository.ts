import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { EntityRepository, Repository, getRepository } from 'typeorm';

@EntityRepository(User)
@Injectable()
export class UserRepository extends Repository<User> {}
