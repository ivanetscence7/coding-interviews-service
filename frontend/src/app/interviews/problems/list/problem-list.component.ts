import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProblemDto } from '../../dto/problemModel/problem.dto';
import { ProblemService } from '../../service/problem.service';
import { MatDialog } from '@angular/material/dialog';
import { finalize, take } from 'rxjs/operators';
import { CreateProblemDialogComponent } from '../dialog/create-problem-dialog.component';

import { EditProblemDto } from '../../dto/problemModel/edit-problem.dto';

@Component({
  selector: 'problem-list-component',
  templateUrl: 'problem-list.component.html',
  styleUrls: ['problem-list.component.scss'],
})
export class ProblemListComponent implements OnInit {
  isLoading = false;
  displayedColumns: string[] = ['title', 'description', 'action'];
  private problemsSubject: BehaviorSubject<ProblemDto[]> = new BehaviorSubject(null);

  constructor(private problemService: ProblemService, private matDialog: MatDialog) {}

  ngOnInit() {
    this.isLoading = true;
    this.problemService
      .getAllProblems()
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe(problems => {
        this.problemsSubject.next(problems);
      });
  }

  public getProblems(): Observable<ProblemDto[]> {
    return this.problemsSubject.asObservable();
  }

  editProblem(editProblemDto: EditProblemDto) {
    this.matDialog
      .open(CreateProblemDialogComponent, {
        data: { editProblemDto: editProblemDto },
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((editedProblem: ProblemDto) => {
        if (editedProblem) {
          const edited = this.problemsSubject
            .getValue()
            .map(problem => (problem.id === editedProblem.id ? { ...editedProblem } : problem));
          this.problemsSubject.next(edited);
        }
      });
  }

  public openCreateProblemDialog() {
    this.matDialog
      .open(CreateProblemDialogComponent)
      .afterClosed()
      .pipe(take(1))
      .subscribe((newProblem: ProblemDto) => {
        if (newProblem) {
          const list = this.problemsSubject.getValue();
          list.push(newProblem);
          this.problemsSubject.next(list.map(problem => ({ ...problem })));
        }
      });
  }

  deleteProblem(problemDto: ProblemDto) {
    this.isLoading = true;
    this.problemService
      .deleteProblem(problemDto.id)
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe(() => {
        const deleted = this.problemsSubject.getValue().filter(problem => problem.id !== problemDto.id);
        this.problemsSubject.next(deleted);
      });
  }
}
