import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Interviewer } from './interviews/models/Interviewer';
import { CandidateModule } from './interviews/module/CandidateModule';
import { Candidate } from './interviews/models/Candidate';
import { InterviewerModule } from './interviews/module/InterviewerModule';
import { AuthModule } from './interviews/module/AuthModule';
import { ProfileModule } from './interviews/module/ProfileModule';
import { InterviewerProfile } from './interviews/models/InterviewerProfile';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './interviews/exceptionfilter/HttpExceptionFilter';
import { ProblemModule } from './interviews/module/ProblemModule';
import { Problem } from './interviews/models/Problem';
import { AppGateway } from './interviews/app.gateway';
import { MailSenderModule } from './interviews/module/MailSenderModule';
import { Interview } from './interviews/models/Interview';
import { SessionModule } from './interviews/module/SessionModule';
import { Session } from './interviews/models/Session';

function getTypeOrmOptions(configService: ConfigService): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: [Interviewer, Candidate, InterviewerProfile, Problem, Interview, Session],
    synchronize: true,
  };
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: getTypeOrmOptions,
      inject: [ConfigService],
    }),
    ProblemModule,
    CandidateModule,
    InterviewerModule,
    AuthModule,
    ProfileModule,
    MailSenderModule,
    SessionModule,
  ],
  providers: [
    AppGateway,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
