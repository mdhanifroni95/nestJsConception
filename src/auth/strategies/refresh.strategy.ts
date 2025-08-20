import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from "../config/jwt.config";
import { AuthJwtPayload } from "../types/auth-jwtPayload";
import { Inject, Injectable } from "@nestjs/common";
import refreshJwtConfig from "../config/refresh-jwt.config";
import { Request } from "express";
import { AuthService } from "../auth.service";

@Injectable()
export class refreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(
    @Inject(refreshJwtConfig.KEY)
    private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
    private authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: refreshJwtConfiguration.secret ?? "",
      ignoreExpiration: false,
      passReqToCallback: true
    });
  }


  async validate(req: Request, payload: AuthJwtPayload) {
    const refreshToken = req.get('Authorization')?.replace("Bearer", "").trim();
    const userId = payload.sub;
    if (!refreshToken) {
      throw new Error("Refresh token is missing from Authorization header");
    }
    return await this.authService.validateRefreshToken(userId, refreshToken);
  }
}