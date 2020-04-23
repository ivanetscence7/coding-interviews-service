import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AppHttpResource } from './app-http.resource';
import { ProblemDto } from '../dto/problemModel/problem.dto';
import { Observable } from 'rxjs';
import { EditProblemDto } from '../dto/problemModel/edit-problem.dto';
import { CreateProblemDto } from '../dto/problemModel/create-problem.dto';

@Injectable()
export class ProblemResource {
  private readonly problemsURL = environment.apiUrl + '/problems';

  constructor(private appHttpResource: AppHttpResource) {}

  getAllProblems(): Observable<ProblemDto[]> {
    return this.appHttpResource.get(this.problemsURL);
  }

  create(problemDto: CreateProblemDto): Observable<ProblemDto> {
    return this.appHttpResource.post(this.problemsURL, problemDto);
  }

  update(problemDto: EditProblemDto): Observable<ProblemDto> {
    return this.appHttpResource.put(this.problemsURL, problemDto);
  }

  delete(id: number) {
    return this.appHttpResource.delete(this.problemsURL + '/' + id);
  }
}
