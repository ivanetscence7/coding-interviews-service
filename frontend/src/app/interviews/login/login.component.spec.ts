import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { LoginComponent } from './login.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../app-routing.module';
import { AuthService } from '../service/auth.service';
import { AuthServiceMock } from '../../app.component.spec';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let authService: AuthService;
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['loginForm']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule, RouterTestingModule],
      providers: [
        AuthService,
        FormBuilder,
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoginComponent);

        component = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
      });
  }));

  it('Component successfully created', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.invalid).toBeTruthy();
    expect(component.isLoading).toBeFalsy();
    expect(component.error).toBeUndefined();
  });

  it('isLoading should be false when login()', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    component.login(component.loginForm);
    expect(component.isLoading).toBeFalse();
  });

  it('login form should be invalid', async(() => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalse();
  }));

  it(`form should be valid`, async(() => {
    component.loginForm.controls['email'].setValue('ivanow@gmail.com');
    component.loginForm.controls['password'].setValue('123');
    expect(component.loginForm.valid).toBeTruthy();
  }));
});
