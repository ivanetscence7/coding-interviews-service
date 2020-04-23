import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { RegistrationInterviewerDto } from '../dto/registration-interviewer.dto';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { LoginResponseDto } from '../dto/login-response.dto';
import { LoginDto } from '../dto/login.dto';
import { environment } from '../../../environments/environment';
import { AppHttpResource } from './app-http.resource';

@Injectable()
export class AuthResource {
  private readonly registerURL = environment.apiUrl + '/auth/register';
  private readonly loginURL = environment.apiUrl + '/auth/login';

  constructor(private httpClient: HttpClient, private appHttpResource: AppHttpResource) {}

  public registerInterviewer(registrationInterviewerDto: RegistrationInterviewerDto): Observable<LoginResponseDto> {
    return this.appHttpResource.post(this.registerURL, registrationInterviewerDto).pipe(catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `My Error: ${error.error.error}`;
    } else {
      errorMessage = error.error.error.message;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  loginForm(loginDto: LoginDto): Observable<LoginResponseDto> {
    return this.appHttpResource.post(this.loginURL, loginDto).pipe(catchError(this.handleError));
  }
}
