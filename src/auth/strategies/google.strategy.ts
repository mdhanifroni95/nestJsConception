import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback, StrategyOptions } from "passport-google-oauth20";
import googleOauthConfig from "../config/google-oauth.config";
import { ConfigType } from "@nestjs/config";
import { AuthService } from "../auth.service";


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleOauthConfig.KEY) private readonly googleConfiguration: ConfigType<typeof googleOauthConfig>,
    private authService: AuthService,
  ) {
    super({
      clientID: googleConfiguration.clientId,
      clientSecret: googleConfiguration.secretKey,
      callbackURL: googleConfiguration.callbackUrl,
      scope: ['email', 'profile'],
    } as StrategyOptions);
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    console.log('Google profile:', profile); // Log the profile for debugging
    const { name, emails, photos } = profile;
    const user = await this.authService.validateGoogleUser({
      email: emails[0].value,
      firstName: name?.givenName,
      lastName: name?.familyName,
      avatarUrl: photos[0]?.value,
      password: ""
    });
    done(null, user);
  }
}
