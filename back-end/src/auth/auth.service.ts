import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { UserDto } from 'src/models/user.dto';
import { UserService } from 'src/services/user.service';

@Injectable()
export class AuthService {
  async requestAccessToken(accessToken: string) {
    const data = {
      code: accessToken,
      client_id:
        '72977505379-1jusaas65jpecfmsh0q7g0a36itss7bm.apps.googleusercontent.com',
      client_secret: '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',
      redirect_uri: 'http://i6b203.p.ssafy.io:3000/auth/google/redirect',
      grant_type: 'authorization_code',
    };
    const newLocal = await axios.post(
      'https://oauth2.googleapis.com/token',
      data,
    );
    if (!newLocal) throw new Error('구글 로그인 실패');
    throw newLocal;
  }
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const userDto = new UserDto();
    userDto.email = username;
    userDto.password = pass;
    console.log('validate user ', userDto);
    const user = await this.userService.signinUser(userDto);

    return user;
  }

  async login(user: UserDto) {
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verifyUser(accessToken: string): Promise<any> {
    const jwt = accessToken.replace('Bearer ', '');
    return this.jwtService.verify(jwt);
  }

  async signInWithGoogle(data): Promise<{ access_token: string }> {
    if (!data.user) throw new BadRequestException();
    console.log('signin google', data.user);

    let user;
    try {
      user = await this.userService.findUserByEmail(data.user.email);
      return this.login(user);
    } catch (err) {
      console.log('create user data');
      const newUser = new UserDto();
      newUser.username = data.user.firstName + ' ' + data.user.lastName;
      newUser.email = data.user.email;
      newUser.password = data.user.password;
      await this.userService.createUser(newUser);
      return this.login(newUser);
    }
  }
}
