export class User {
  email;
  username;
  biography;
  follower;
  following;

  constructor(email, username, biography, follower, following) {
    this.email = email;
    this.username = username;
    this.biography = biography;
    this.follower = follower;
    this.following = following;
  }
}
