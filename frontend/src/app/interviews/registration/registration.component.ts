import { Component, OnInit } from '@angular/core';
import { RegistrationInterviewerDto } from '../dto/registration-interviewer.dto';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { finalize, take } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: 'registration.component.html',
  styleUrls: ['registration.css'],
})
export class RegistrationComponent {
  interviewerDto: RegistrationInterviewerDto = {} as RegistrationInterviewerDto;
  isLoading = false;
  registrationForm: FormGroup;
  error: string;

  error_messages = {
    firstName: [{ type: 'required', message: 'First Name is required' }],

    lastName: [{ type: 'required', message: 'Last Name is required' }],

    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'minlength', message: 'Email length' },
      { type: 'maxlength', message: 'Email length' },
      { type: 'required', message: 'Please enter a valid email address' },
    ],

    password: [
      { type: 'required', message: 'password is required' },
      { type: 'minlength', message: 'password length incorrect' },
      { type: 'maxlength', message: 'password length incorrect' },
    ],

    passwordConfirmation: [
      { type: 'required', message: 'password is required' },
      { type: 'minlength', message: 'password length incorrect' },
      { type: 'maxlength', message: 'password length incorrect' },
    ],
  };

  constructor(private authService: AuthService, public formBuilder: FormBuilder, private router: Router) {
    this.registrationForm = this.formBuilder.group(
      {
        firstName: new FormControl('', Validators.compose([Validators.required])),
        lastName: new FormControl('', Validators.compose([Validators.required])),
        email: new FormControl('', Validators.email),
        password: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
        ),
        passwordConfirmation: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
        ),
      },
      {
        validators: this.password.bind(this),
      },
    );
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: passwordConfirmation } = formGroup.get('passwordConfirmation');
    return password === passwordConfirmation ? null : { passwordNotMatch: true };
  }

  public submit(registrationForm: FormGroup) {
    if (registrationForm.valid) {
      this.isLoading = true;
      this.authService
        .registerInterviewer(this.interviewerDto)
        .pipe(take(1))
        .subscribe(
          response => {
            finalize(() => (this.isLoading = false));
            if (response.status === 'success') {
              this.authService.setUser(response);
            }
          },
          error => {
            this.error = error;
          },
        );
    }
  }
}
