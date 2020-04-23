import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../../app-routing.module';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateProblemDialogComponent } from './create-problem-dialog.component';
import { ProblemService } from '../../service/problem.service';
import { EditProblemDto } from '../../dto/problemModel/edit-problem.dto';
import { CreateProblemDto } from '../../dto/problemModel/create-problem.dto';
import { ProblemDto } from '../../../../../../backend/src/interviews/dto/ProblemDto';
import { from, Observable } from 'rxjs';

export class ProblemServiceMock {
  editProblem() {}
  createProblem() {}
}

describe('Problem create.candidate.dialog component', () => {
  let problemService: ProblemService;
  let comp: CreateProblemDialogComponent;
  let fixture: ComponentFixture<CreateProblemDialogComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  const problemServiceSpyEditProblem = jasmine.createSpyObj('ProblemService', ['editProblem']);
  const problemServiceSpyCreateProblem = jasmine.createSpyObj('ProblemService', ['createProblem']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProblemDialogComponent],
      imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule, MatDialogModule],
      providers: [
        ProblemService,
        {
          provide: ProblemService,
          useClass: ProblemServiceMock,
        },
        { provide: ProblemService, useValue: problemServiceSpyEditProblem },
        { provide: ProblemService, useValue: problemServiceSpyCreateProblem },
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: [],
        },
        MatDialogModule,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CreateProblemDialogComponent);
        problemService = TestBed.inject(ProblemService);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
      });
  }));

  it(`should call the Submit method`, async(() => {
    spyOn(comp, 'submit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(comp.submit).toHaveBeenCalled();
  }));

  it('should be created', () => {
    expect(problemService).toBeTruthy();
  });

  it('method editProblem should be called', () => {
    const dto = new EditProblemDto();
    const expectedResult = new ProblemDto();
    const obs = new Observable(sub => {
      sub.next(expectedResult);
    });
    problemServiceSpyEditProblem.editProblem.and.returnValue(obs);
    expect(problemServiceSpyEditProblem.editProblem(dto)).toEqual(obs);
    expect(problemServiceSpyEditProblem.editProblem).toHaveBeenCalled();
  });

  it('method createProblem should be called', async () => {
    const dto = new CreateProblemDto();
    const expectedResult = new ProblemDto();
    const obs = new Observable(sub => {
      sub.next(expectedResult);
    });
    problemServiceSpyCreateProblem.createProblem.and.returnValue(obs);
    expect(problemServiceSpyCreateProblem.createProblem(dto)).toEqual(obs);
    expect(problemServiceSpyCreateProblem.createProblem).toHaveBeenCalled();
  });
});
