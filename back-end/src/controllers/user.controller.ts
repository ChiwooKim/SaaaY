import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { access } from 'fs';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { ResourceError } from 'src/error/resource.error';
import { UserDto } from 'src/models/user.dto';
import { UserService } from 'src/services/user.service';
import { AccountService } from '../services/account.service';

// TODO : https://docs.nestjs.com/controllers https://wikidocs.net/148192

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly accountService: AccountService,
  ) {}

  @Get('/name/:userName')
  async searchUsername(
    @Param('userName') userName: string,
    @Res() res: Response,
  ) {
    console.log('search user :', userName);
    try {
      const userDtos = await this.userService.findUserByUsername(userName);
      res.status(HttpStatus.OK).json(userDtos);
    } catch (err) {
      console.log(err);
      res.status(HttpStatus.BAD_GATEWAY).send();
    }
  }

  @Post('/email')
  async searchEmail(@Body() params: { email: string }, @Res() res: Response) {
    try {
      const userDto = await this.findByEmail(params.email);
      res.status(HttpStatus.OK).json(userDto);
    } catch (err) {
      console.log(err);
      if (err instanceof ResourceError) {
        res.status(err.httpStatus).json(err);
      } else {
        res.status(HttpStatus.BAD_GATEWAY).send();
      }
    }
  }

  private async findByEmail(email: string) {
    const userDto = await this.userService.findUserByEmail(email);
    userDto.follower = await (
      await this.accountService.getFollowerList(userDto.id)
    ).map((r) => r.get('target').properties);
    userDto.following = await (
      await this.accountService.getFollowingList(userDto.id)
    ).map((r) => r.get('target').properties);
    return userDto;
  }

  @Post('/signup')
  async signup(@Body() userDto: UserDto, @Res() res: Response) {
    console.log('create user :', userDto);
    try {
      const newUser = await this.userService.createUser(userDto);
      res.status(HttpStatus.CREATED).json(newUser).send();
    } catch (err) {
      Logger.error(err);
      res.status(HttpStatus.BAD_GATEWAY).send();
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() userDto: UserDto) {
    console.log('auth login :', userDto);
    const user = await this.userService.findUserByEmail(userDto.email);
    console.log(user);
    return this.authService.login(user);
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(
    @Headers('Authorization') accessToken,
    @Res() res: Response,
  ) {
    try {
      const user = await this.authService.verifyUser(accessToken);
      const userDto = await this.findByEmail(user.email);
      res.status(HttpStatus.OK).json(userDto);
    } catch (err) {
      Logger.error(err);
      res.status(HttpStatus.BAD_GATEWAY).send();
    }
  }

  @Put('/profile')
  @UseGuards(JwtAuthGuard)
  async editProfile(@Body() userDto: UserDto, @Res() res: Response) {
    console.log('edit profile :', userDto);
    try {
      const updatedUser = await this.userService.editProfile(userDto);
      res.status(HttpStatus.OK).json(updatedUser);
    } catch (err) {
      Logger.error(err);
      res.status(HttpStatus.BAD_GATEWAY).send();
    }
  }

  @Patch('/password')
  @UseGuards(JwtAuthGuard)
  async editPassword(@Body() userDto: UserDto, @Res() res: Response) {
    console.log('edit password :', userDto);
    try {
      await this.userService.editPassword(userDto);
      res.status(HttpStatus.OK).send();
    } catch (err) {
      Logger.error(err);
      res.status(HttpStatus.BAD_GATEWAY).send();
    }
  }

  @Get('/verify')
  async verify(@Headers('Authorization') accessToken, @Res() res: Response) {
    console.log('verify user by Access Token');
    const result = await this.authService.verifyUser(accessToken);
    if (result) {
      const user = await this.findByEmail(result.email);
      res.status(HttpStatus.OK).json(user);
    }
  }
}
