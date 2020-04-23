import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { finalize, take } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginDto } from '../dto/login.dto';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss'],
})
export class LoginComponent {
  loginDto: LoginDto = {} as LoginDto;
  loginForm: FormGroup;
  isLoading = false;
  error: string;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  login(loginForm: FormGroup) {
    if (loginForm.valid) {
      this.isLoading = true;
      this.authService
        .loginForm(this.loginDto)
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
