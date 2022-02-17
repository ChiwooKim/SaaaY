import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entity/role.entity';
import { User } from 'src/entity/user.entity';
import { UserDto } from 'src/models/user.dto';
import { UserRepository } from 'src/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { Record, Result } from 'neo4j-driver';
import { AuthenticationError } from 'src/error/authentication.error';
import axios, { AxiosResponse } from 'axios';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
@Injectable()
export class UserService {
  async findUser(userId: string): Promise<UserDto> {
    const userDto = await this.userRepository.findById(userId);
    userDto.password = undefined;
    return userDto;
  }
  private readonly userRepository: UserRepository = new UserRepository();

  async editPassword(userDto: UserDto): Promise<UserDto> {
    const hash = await bcrypt.hash(userDto.password, this.saltRounds);
    userDto.password = hash;
    const result = await this.userRepository.updatePassword(userDto);
    result.password = undefined;
    return result;
  }
  async editProfile(userDto: UserDto): Promise<UserDto> {
    const updatedUser: UserDto = await this.userRepository.updateUser(userDto);
    updatedUser.password = undefined;
    return updatedUser;
  }
  public async findUserByEmail(email: string): Promise<UserDto> {
    const foundUser = await this.userRepository.findByEmail(email);
    foundUser.password = undefined;
    return foundUser;
  }
  private saltRounds = 10;

  public async signinUser(userDto: UserDto): Promise<UserDto> {
    const foundUser = await this.userRepository.findByEmail(userDto.email);

    const storedPassword = foundUser.password;

    const isMatch = await bcrypt.compare(userDto.password, storedPassword);
    if (!isMatch) {
      throw new AuthenticationError('틀린 비밀번호');
    }

    foundUser.password = undefined;
    return foundUser;
  }

  public async findUserByUsername(userName: string): Promise<UserDto[]> {
    const userDtos = await this.userRepository.findByUsername(userName);
    userDtos.forEach((u) => (u.password = undefined));
    return userDtos;
  }

  public async createUser(userDto: UserDto): Promise<UserDto> {
    const password = userDto.password;
    const hash = await bcrypt.hash(password, this.saltRounds);
    userDto.password = hash;
    const result = await this.userRepository.createUser(userDto);
    result.password = undefined;
    return result;
  }
}
