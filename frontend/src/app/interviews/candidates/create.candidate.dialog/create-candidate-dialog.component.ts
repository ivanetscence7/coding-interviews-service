import { Component, Inject, OnInit } from '@angular/core';
import { CreateCandidateDto } from '../../dto/create-candidate.dto';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CandidateService } from '../../service/candidate.service';
import { finalize, take } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-candidate-dialog',
  templateUrl: 'create-candidate-dialog.component.html',
  styleUrls: ['create-candidate-dialog.scss'],
})
export class CreateCandidateDialogComponent {
  newCandidateModelDto: CreateCandidateDto = {} as CreateCandidateDto;
  isLoading = false;
  createCandidateForm: FormGroup;
  error: string;

  error_messages = {
    age: { type: 'required', message: 'Only numbers here from 1 to 99' },
    email: { type: 'require', message: 'Invalid email address' },
  };

  constructor(
    private dialogRef: MatDialogRef<CreateCandidateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { createCandidateDto: CreateCandidateDto },
    private candidateService: CandidateService,
  ) {
    this.createCandidateForm = new FormGroup({
      fullName: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      desiredPosition: new FormControl('', Validators.compose([Validators.required])),
      age: new FormControl('', [Validators.pattern('^[1-9]{1,2}$'), Validators.required]),
      languageSkill: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  public submit(form: FormGroup) {
    if (form.valid) {
      this.isLoading = true;
      this.candidateService
        .createCandidate(this.newCandidateModelDto)
        .pipe(
          take(1),
          finalize(() => (this.isLoading = false)),
        )
        .subscribe(
          response => {
            this.dialogRef.close(response);
          },
          error => {
            this.error = error;
          },
        );
    }
  }
}
