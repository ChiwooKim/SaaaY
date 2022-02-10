import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';

export class UserCustomRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  findByUsername(userName: string): Promise<User> {
    // return this.findOneOrFail({ where: { username: userName } });
    return this.userRepository.findOne({
      relations: ['role'],
      where: { username: userName },
    });
  }
}
