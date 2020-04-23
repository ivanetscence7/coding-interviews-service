import { RegistrationComponent } from './registration.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { AuthServiceMock } from '../../app.component.spec';
import { AppRoutingModule } from '../../app-routing.module';

describe('RegistrationComponent', () => {
  let comp: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
      providers: [
        AuthService,
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(RegistrationComponent);

        comp = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
      });
  }));

  it(` error message for firstName should have as size equal 1'`, async(() => {
    expect(comp.error_messages.firstName.length).toEqual(1);
  }));

  it(`should set isLoading to false`, async(() => {
    comp.submit(comp.registrationForm);
    expect(comp.isLoading).toBeFalse();
  }));

  it(`should call the submit method`, async(() => {
    spyOn(comp, 'submit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(comp.submit).toHaveBeenCalled();
  }));

  it(`form should be invalid`, async(() => {
    comp.registrationForm.controls['firstName'].setValue('');
    comp.registrationForm.controls['lastName'].setValue('');
    comp.registrationForm.controls['email'].setValue('');
    comp.registrationForm.controls['password'].setValue('');
    comp.registrationForm.controls['passwordConfirmation'].setValue('');
    expect(comp.registrationForm.valid).toBeFalsy();
  }));

  it(`form should be valid`, async(() => {
    comp.registrationForm.controls['firstName'].setValue('ivan');
    comp.registrationForm.controls['lastName'].setValue('ivanov');
    comp.registrationForm.controls['email'].setValue('ivanow@gmail.com');
    comp.registrationForm.controls['password'].setValue('123');
    comp.registrationForm.controls['passwordConfirmation'].setValue('123');
    expect(comp.registrationForm.valid).toBeTruthy();
  }));

  it(`password should be not equals passwordConfirmation`, async(() => {
    comp.registrationForm.controls['password'].setValue('asddsa');
    comp.registrationForm.controls['passwordConfirmation'].setValue('12asd3');
    expect(comp.registrationForm.valid).toBeFalsy();
  }));

  it(`password should be equals passwordConfirmation`, async(() => {
    comp.registrationForm.controls['password'].setValue('123');
    comp.registrationForm.controls['passwordConfirmation'].setValue('123');
    expect(comp.password).toBeTruthy();
  }));
});
