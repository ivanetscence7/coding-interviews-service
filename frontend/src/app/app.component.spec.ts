import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CandidateListComponent } from './interviews/candidates/list/candidate-list.component';
import { CreateCandidateDialogComponent } from './interviews/candidates/create.candidate.dialog/create-candidate-dialog.component';
import { RegistrationComponent } from './interviews/registration/registration.component';
import { LoginComponent } from './interviews/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { AuthService } from './interviews/service/auth.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CandidateListComponent,
        CreateCandidateDialogComponent,
        RegistrationComponent,
        LoginComponent,
      ],
      imports: [AppRoutingModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});

export class AuthServiceMock {
  isLoggedIn() {}

  registerInterviewer() {}

  setUser() {}

  logout() {}

  loginForm() {}
}
