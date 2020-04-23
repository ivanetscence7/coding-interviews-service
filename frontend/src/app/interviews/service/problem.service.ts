import { Injectable } from '@angular/core';
import { ProblemResource } from '../resource/problem.resource';
import { Observable } from 'rxjs';
import { ProblemDto } from '../dto/problemModel/problem.dto';
import { EditProblemDto } from '../dto/problemModel/edit-problem.dto';
import { CreateProblemDto } from '../dto/problemModel/create-problem.dto';

@Injectable()
export class ProblemService {
  constructor(private problemResource: ProblemResource) {}

  public getAllProblems(): Observable<ProblemDto[]> {
    return this.problemResource.getAllProblems();
  }

  public editProblem(editProblemDto: EditProblemDto): Observable<ProblemDto> {
    return this.problemResource.update(editProblemDto) as Observable<ProblemDto>;
  }

  public createProblem(problemDto: CreateProblemDto): Observable<ProblemDto> {
    return this.problemResource.create(problemDto);
  }

  public deleteProblem(id: number): Observable<void> {
    return this.problemResource.delete(id);
  }
}
