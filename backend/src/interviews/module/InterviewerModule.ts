import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interviewer } from '../models/Interviewer';
import { InterviewerController } from '../controllers/InterviewerController';
import { InterviewerService } from '../services/InterviewerService';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthSpecificModule } from './AuthSpecificModule';

@Module({
  imports: [TypeOrmModule.forFeature([Interviewer]), AuthSpecificModule],
  controllers: [InterviewerController],
  providers: [InterviewerService],
  exports: [InterviewerService],
})
export class InterviewerModule {}
