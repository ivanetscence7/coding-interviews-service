import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthService } from './AuthService';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../models/JwtPayload';
import { Interviewer } from '../models/Interviewer';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_OR_PRIVATE_KEY,
    });
  }

  async validate(payload: JwtPayload): Promise<Interviewer> {
    const user = await this.authService.validateUser(payload.email);
    if (!user) {
      new UnauthorizedException('Unauthorized access');
    }
    return user;
  }
}
