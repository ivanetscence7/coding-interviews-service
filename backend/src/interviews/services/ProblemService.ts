import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Problem } from '../models/Problem';
import { Interviewer } from '../models/Interviewer';
import { ProblemDto } from '../dto/ProblemDto';

@Injectable()
export class ProblemService {
  constructor(@InjectRepository(Problem) private readonly problemRepository: Repository<Problem>) {}

  findByInterviewer(interviewer: Interviewer): Promise<Problem[]> {
    return this.problemRepository.find({
      where: {
        interviewerId: interviewer.id,
      },
    });
  }

  async findProblemByTitle(title: string) {
    return await this.problemRepository.findOne({
      where: {
        title: title,
      },
    });
  }

  create(problemDto: ProblemDto, interviewer: Interviewer): Promise<Problem> {
    const problem = new Problem();

    problem.title = problemDto.title;
    problem.description = problemDto.description;
    problem.interviewerId = interviewer.id;

    return this.problemRepository.save(problem);
  }

  delete(id: number, interviewer: Interviewer): Promise<any> {
    return this.problemRepository.delete({
      id: id,
    });
  }

  update(problemDto: ProblemDto, interviewer: Interviewer): Promise<Problem> {
    return this.problemRepository.save(problemDto);
  }
}
