import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  public async findUser(userId: string): Promise<User> {
    // let userDto;
    // await this.userRepository.findOne(userId).then((m) => {
    //   return m;
    // });
    // return userDto;
    return this.userRepository.findOne(userId);
  }
}
