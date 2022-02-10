import { Role } from 'src/entity/role.entity';
import { User } from 'src/entity/user.entity';

export class UserDto {
  public email: string;
  public username: string;
  public password: string;
  public grade: string;
  public biography: string;
  public role: Role;

  constructor(user: User) {
    this.email = user.email;
    this.username = user.username;
    this.grade = user.grade;
    this.biography = user.biography;
    this.role = user.role;
  }
}
