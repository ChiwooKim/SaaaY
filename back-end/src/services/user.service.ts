import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entity/role.entity';
import { User } from 'src/entity/user.entity';
import { UserDto } from 'src/models/user.dto';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UserService {
  private readonly userRepository: UserRepository = new UserRepository();

  public async findUserByUsername(userName: string): Promise<UserDto> {
    try {
      const userDto = await this.userRepository.findByUsername(userName);
      return userDto;
    } catch (err) {
      throw err;
    }
  }

  public async createUser(userDto: UserDto): Promise<UserDto> {
    try {
      const result = await this.userRepository.createUser(userDto);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
