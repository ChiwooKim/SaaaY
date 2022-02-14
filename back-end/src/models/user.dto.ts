import { Role } from 'src/entity/role.entity';
import { User } from 'src/entity/user.entity';

export class UserDto {
  public id: string;
  public email: string;
  public username: string;
  public password: string;
  public grade: string;
  public biography: string;
  public role: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
