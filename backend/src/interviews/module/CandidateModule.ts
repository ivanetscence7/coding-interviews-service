import { Module } from '@nestjs/common';
import { CandidateService } from '../services/CandidateService';
import { CandidateController } from '../controllers/CandidateController';
import { Candidate } from '../models/Candidate';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthSpecificModule } from './AuthSpecificModule';
import { MailSenderModule } from './MailSenderModule';
import { MailSenderService } from '../services/MailSenderService';
import { SessionService } from '../services/SessionService';
import { Interview } from '../models/Interview';
import { Session } from '../models/Session';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate, Interview, Session]), AuthSpecificModule],
  controllers: [CandidateController],
  providers: [AuthSpecificModule, CandidateService, MailSenderService, SessionService],
  exports: [AuthSpecificModule, CandidateService, MailSenderService, SessionService],
})
export class CandidateModule {}
