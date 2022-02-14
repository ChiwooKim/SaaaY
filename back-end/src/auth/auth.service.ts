import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/models/user.dto';
import { UserService } from 'src/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const userDto = new UserDto(username, pass);

    const user = await this.userService.signinUser(userDto);

    return user;
  }

  async login(user: UserDto) {
    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verifyUser(accessToken: string): Promise<any> {
    const jwt = accessToken.replace('Bearer ', '');
    return this.jwtService.verify(jwt);
  }
}
