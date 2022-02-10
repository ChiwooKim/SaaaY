export class UserDto {
  public email: string;
  public username: string;
  public password: string;
  public grade: string;
  public biography: string;
  public role: string;

  constructor(user: {
    email: string;
    username: string;
    grade: string;
    biography: string;
    role: string;
  }) {
    this.email = user.email;
    this.username = user.username;
    this.grade = user.grade;
    this.biography = user.biography;
    this.role = user.role;
  }
}
