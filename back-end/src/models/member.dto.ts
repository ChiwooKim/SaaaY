export class MemberDto {
  public email: string;
  public username: string;
  public password: string;
  public grade: string;
  public biography: string;
  public role: string;

  constructor(member: {
    email: string;
    username: string;
    grade: string;
    biography: string;
    role: string;
  }) {
    this.email = member.email;
    this.username = member.username;
    this.grade = member.grade;
    this.biography = member.biography;
    this.role = member.role;
  }
}
