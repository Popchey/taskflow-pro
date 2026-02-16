/* eslint-disable @typescript-eslint/require-await */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

// Google OAuth is optional - uncomment when you want to implement it
// Install: npm install passport-google-oauth20 @types/passport-google-oauth20
// import { Strategy } from 'passport-google-oauth20';

// Placeholder to prevent TypeScript errors
// Remove this and uncomment the above imports when implementing Google OAuth
class Strategy {
  constructor() {}
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(configService: ConfigService) {
    super();
    // TODO: Uncomment and configure when implementing Google OAuth
    // super({
    //   clientID: configService.get('GOOGLE_CLIENT_ID') || 'placeholder',
    //   clientSecret: configService.get('GOOGLE_CLIENT_SECRET') || 'placeholder',
    //   callbackURL: 'http://localhost:3000/auth/google/callback',
    //   scope: ['email', 'profile'],
    // });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { emails, photos, displayName } = profile;
    return {
      email: emails[0].value,
      name: displayName,
      picture: photos[0].value,
      accessToken,
    };
  }
}
