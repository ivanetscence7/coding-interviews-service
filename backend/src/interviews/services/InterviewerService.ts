import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interviewer } from '../models/Interviewer';

@Injectable()
export class InterviewerService {
  constructor(@InjectRepository(Interviewer) private readonly interviewerRepository: Repository<Interviewer>) {}

  async getInterviewerByEmail(email: string): Promise<Interviewer> {
    const interviewer = await this.findByEmail(email);
    if (!interviewer) {
      throw new NotFoundException('Interviewer not found');
    } else {
      return interviewer;
    }
  }

  async create(interviewer: Interviewer): Promise<Interviewer> {
    const interviewerInDb = await this.findByEmail(interviewer.email);
    if (interviewerInDb) {
      throw new BadRequestException('User already exists');
    }
    return await this.interviewerRepository.save(interviewer);
  }

  async findByEmail(email: string) {
    return await this.interviewerRepository.findOne({
      where: {
        email: email,
      },
    });
  }
}
