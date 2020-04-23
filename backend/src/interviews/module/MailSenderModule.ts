import { Module } from '@nestjs/common';
import { HandlebarsAdapter, MailerModule } from '@nestjs-modules/mailer';
import { MailSenderService } from '../services/MailSenderService';
import { CandidateController } from '../controllers/CandidateController';
import { CandidateService } from '../services/CandidateService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from '../models/Candidate';
import { SessionController } from '../controllers/SessionController';
import { SessionService } from '../services/SessionService';
import { Interview } from '../models/Interview';
import { Session } from '../models/Session';
import { ProblemService } from '../services/ProblemService';
import { Problem } from '../models/Problem';

@Module({
  imports: [
    TypeOrmModule.forFeature([Candidate, Interview, Session, Problem]),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.MAILDEV_INCOMING_USER,
          pass: process.env.MAILDEV_INCOMING_PASS,
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@localhost>',
      },
      preview: true,
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [CandidateController, SessionController],
  providers: [MailSenderService, CandidateService, SessionService, ProblemService],
})
export class MailSenderModule {}
