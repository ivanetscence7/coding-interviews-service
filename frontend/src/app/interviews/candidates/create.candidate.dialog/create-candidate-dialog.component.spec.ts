import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NgModule } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../../app-routing.module';
import { CreateCandidateDialogComponent } from './create-candidate-dialog.component';
import { CandidateService } from '../../service/candidate.service';
import { CandidateListComponent } from '../list/candidate-list.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export class CandidateServiceMock {
  getAllCandidateItems() {}

  createCandidate() {}

  deleteCandidate() {}
}
describe('Create Candidate create.candidate.dialog component', () => {
  let comp: CreateCandidateDialogComponent;
  let fixture: ComponentFixture<CreateCandidateDialogComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCandidateDialogComponent, CandidateListComponent],
      imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule, MatDialogModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: [],
        },
        MatDialogModule,
        CandidateService,
        {
          provide: CandidateService,
          useClass: CandidateServiceMock,
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CreateCandidateDialogComponent);

        comp = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
      });
  }));

  it(` error message for age should have as size equal 1'`, async(() => {
    expect(comp.error_messages.age.length).toEqual(1);
  }));

  it(`should set isLoading to false`, async(() => {
    comp.submit(comp.createCandidateForm);
    expect(comp.isLoading).toBeFalse();
  }));

  it(`should call the Submit method`, async(() => {
    spyOn(comp, 'submit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(comp.submit).toHaveBeenCalled();
  }));

  it(`form should be invalid`, async(() => {
    comp.createCandidateForm.controls['fullName'].setValue('');
    comp.createCandidateForm.controls['email'].setValue('');
    comp.createCandidateForm.controls['desiredPosition'].setValue('');
    comp.createCandidateForm.controls['age'].setValue('');
    expect(comp.createCandidateForm.valid).toBeFalsy();
  }));
});
