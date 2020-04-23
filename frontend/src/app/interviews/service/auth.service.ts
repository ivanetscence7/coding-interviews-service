import { Injectable } from '@angular/core';
import { AuthResource } from '../resource/auth.resource';
import { RegistrationInterviewerDto } from '../dto/registration-interviewer.dto';
import { Observable } from 'rxjs';
import { LoginResponseDto } from '../dto/login-response.dto';
import { Router } from '@angular/router';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private authResource: AuthResource, private router: Router) {}

  public registerInterviewer(registrationInterviewerDto: RegistrationInterviewerDto): Observable<LoginResponseDto> {
    return this.authResource.registerInterviewer(registrationInterviewerDto);
  }

  loginForm(loginDto: LoginDto): Observable<LoginResponseDto> {
    return this.authResource.loginForm(loginDto);
  }

  isLoggedIn() {
    return localStorage.getItem('access_token') !== null;
  }

  setUser(response: any) {
    localStorage.setItem('email', response.email);
    localStorage.setItem('access_token', response.access_token);
    this.router.navigateByUrl('coding-interviews/list');
  }

  logout() {
    localStorage.clear();
    window.location.assign('login');
    this.router.navigateByUrl('login');
  }
}
