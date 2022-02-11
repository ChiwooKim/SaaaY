import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entity/role.entity';
import { User } from 'src/entity/user.entity';
import { UserDto } from 'src/models/user.dto';
import { UserCustomRepository } from 'src/repositories/user.custom.repository';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly userCustomRepository: UserCustomRepository,
  ) {}

  public async findUser(userId: string): Promise<User> {
    // let userDto;
    // await this.userRepository.findOne(userId).then((m) => {
    //   return m;
    // });
    // return userDto;
    console.log(await this.userRepository.findOne(userId));
    // this.userRepository.findOne(userId).then(async (user) => {
    //   const role: Role = await user.role;
    //   console.log(role.roleName);
    //   // const userDto = new UserDto(user);
    //   // return userDto;
    // });
    throw new Error('없는 유저 입니다');
  }

  public async findUserByName(userName: string): Promise<UserDto> {
    try {
      const user = await this.userCustomRepository.findByUsername(userName);
      const userDto = new UserDto(user);
      return userDto;
    } catch (err) {
      throw err;
    }
  }
}
