import { TypeOrmModule } from '@nestjs/typeorm';
import { Interview } from '../models/Interview';
import { SessionController } from '../controllers/SessionController';
import { SessionService } from '../services/SessionService';
import { Module } from '@nestjs/common';
import { Session } from '../models/Session';
import { ProblemService } from '../services/ProblemService';
import { Problem } from '../models/Problem';

@Module({
  imports: [TypeOrmModule.forFeature([Interview, Session, Problem])],
  controllers: [SessionController],
  providers: [SessionService, ProblemService],
  exports: [SessionService, ProblemService],
})
export class SessionModule {}
