import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from 'auth/auth.service';
import { TokenPayload } from 'auth/interfaces';
import { AppConfigType } from 'config';

const getRefreshToken = (req: Request) => req.body?.refreshToken;

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private authService: AuthService,
    config: ConfigService<AppConfigType, true>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => getRefreshToken(req)]),
      ignoreExpiration: false,
      secretOrKey: config.get('jwtRefreshSecret', { infer: true }),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: TokenPayload) {
    const refreshToken = getRefreshToken(req);

    const user = await this.authService.validateUserWithRefreshToken(payload.sub, refreshToken);
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return user;
  }
}
