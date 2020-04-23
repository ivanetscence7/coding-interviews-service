import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../services/JwtStrategy';
import { AuthService } from '../services/AuthService';
import { InterviewerService } from '../services/InterviewerService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interviewer } from '../models/Interviewer';
import { ConfigModule } from '@nestjs/config';
import { ProfileService } from '../services/ProfileService';
import { InterviewerProfile } from '../models/InterviewerProfile';
import { Problem } from '../models/Problem';
import { ProblemService } from '../services/ProblemService';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Interviewer, InterviewerProfile, Problem]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secretOrPrivateKey: process.env.SECRET_OR_PRIVATE_KEY,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  providers: [PassportModule, JwtStrategy, AuthService, InterviewerService, ProfileService, ProblemService, JwtModule],
  exports: [PassportModule, JwtStrategy, AuthService, InterviewerService, ProfileService, ProblemService, JwtModule],
})
export class AuthSpecificModule {}
