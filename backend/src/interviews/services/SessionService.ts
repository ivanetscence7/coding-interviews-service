import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interview } from '../models/Interview';
import { Session } from '../models/Session';
import { SendInviteDto } from '../dto/SendInviteDto';
import { ProblemService } from './ProblemService';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Interview) private readonly interviewRepository: Repository<Interview>,
    @InjectRepository(Session) private readonly sessionRepository: Repository<Session>,
    private problemService: ProblemService,
  ) {}

  async findByUUID(uuid: string) {
    return await this.interviewRepository.findOne({
      where: {
        uuid: uuid,
      },
    });
  }

  async create(inviteDto: SendInviteDto) {
    const session = new Session();
    const interview = new Interview();

    this.setInterviewProperties(interview, inviteDto);

    session.candidateEmail = inviteDto.candidateEmail;
    session.problemTitle = inviteDto.problemTitle;
    session.sessionUuid = inviteDto.sessionUuid;
    const currProblem = await this.problemService.findProblemByTitle(inviteDto.problemTitle);
    session.problemDescription = currProblem.description;

    if (this.getUuidByEmail(session.candidateEmail)) {
      this.deleteSession(session.candidateEmail);
      await this.sessionRepository.save(session);
    } else {
      await this.sessionRepository.save(session);
    }
    await this.interviewRepository.save(interview);
  }

  deleteInterview(uuid: string) {
    return this.interviewRepository.delete({
      uuid: uuid,
    });
  }

  deleteSession(email: string) {
    return this.sessionRepository.delete({
      candidateEmail: email,
    });
  }

  setInterviewProperties(interview: Interview, inviteDto: SendInviteDto) {
    interview.interviewCandidateEmail = inviteDto.candidateEmail;
    interview.uuid = inviteDto.sessionUuid;
  }

  getInterviewProblem(uuid: string): Promise<Session> {
    return this.sessionRepository.findOne({
      where: {
        sessionUuid: uuid,
      },
    });
  }

  getUuidByEmail(email: string): Promise<Session> {
    return this.sessionRepository.findOne({
      where: {
        candidateEmail: email,
      },
    });
  }
}
