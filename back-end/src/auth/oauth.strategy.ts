import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/services/user.service';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      // Put config in `.env`
      clientID:
        '72977505379-1jusaas65jpecfmsh0q7g0a36itss7bm.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://i6b203.p.ssafy.io:3000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    console.log(profile.id);
    const { name, emails } = profile;
    const user = {
      email: emails[0].value,
      password: profile.id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
