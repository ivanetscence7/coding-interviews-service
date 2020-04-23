import { TypeOrmModule } from '@nestjs/typeorm';
import { Interviewer } from '../models/Interviewer';
import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/AuthController';
import { InterviewerService } from '../services/InterviewerService';
import { AuthService } from '../services/AuthService';
import { AuthSpecificModule } from './AuthSpecificModule';
import { ProfileService } from '../services/ProfileService';
import { InterviewerProfile } from '../models/InterviewerProfile';
import { Problem } from '../models/Problem';

@Module({
  imports: [TypeOrmModule.forFeature([Interviewer, InterviewerProfile, Problem]), AuthSpecificModule],
  controllers: [AuthController],
  providers: [AuthSpecificModule, AuthService, InterviewerService, ProfileService],
  exports: [AuthSpecificModule, AuthService, InterviewerService, ProfileService],
})
export class AuthModule {}
