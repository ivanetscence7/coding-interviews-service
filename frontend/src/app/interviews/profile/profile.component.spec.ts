import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../service/profile.service';
import { AppRoutingModule } from '../../app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { RegistrationInterviewerDto } from '../dto/registration-interviewer.dto';
import { Observable } from 'rxjs';
import { DebugElement } from '@angular/core';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  const profileServiceSpyGetInterviewer = jasmine.createSpyObj('ProfileService', ['getInterviewerInfo']);
  const profileServiceSpyEditProfile = jasmine.createSpyObj('ProfileService', ['editProfile']);
  const profileServiceSpyGetProfile = jasmine.createSpyObj('ProfileService', ['getInterviewerProfile']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule, MatDialogModule],
      providers: [
        MatDialogModule,
        ProfileService,
        {
          provide: ProfileService,
          useClass: ProfileServiceMock,
        },
        { provide: ProfileService, useValue: profileServiceSpyGetInterviewer },
        { provide: ProfileService, useValue: profileServiceSpyEditProfile },
        { provide: ProfileService, useValue: profileServiceSpyGetProfile },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;

        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
      });
  }));

  it('should create the comp', async () => {
    expect(component).toBeTruthy();
  });

  it('method getInterviewerInfo should be called', () => {
    let interviewerDto = new RegistrationInterviewerDto();

    const obs = new Observable(sub => {
      sub.next(interviewerDto);
    });

    profileServiceSpyGetInterviewer.getInterviewerInfo.and.returnValue(obs);
    expect(profileServiceSpyGetInterviewer.getInterviewerInfo()).toEqual(obs);
    expect(profileServiceSpyGetInterviewer.getInterviewerInfo).toHaveBeenCalled();
  });

  it('method editProfile should be called', () => {
    let interviewerDto = new RegistrationInterviewerDto();

    const obs = new Observable(sub => {
      sub.next(interviewerDto);
    });

    profileServiceSpyEditProfile.editProfile.and.returnValue(obs);
    expect(profileServiceSpyEditProfile.editProfile()).toEqual(obs);
    expect(profileServiceSpyEditProfile.editProfile).toHaveBeenCalled();
  });

  it('method getInterviewerProfile should be called', () => {
    let interviewerDto = new RegistrationInterviewerDto();

    const obs = new Observable(sub => {
      sub.next(interviewerDto);
    });

    profileServiceSpyGetProfile.getInterviewerProfile.and.returnValue(obs);
    expect(profileServiceSpyGetProfile.getInterviewerProfile()).toEqual(obs);
    expect(profileServiceSpyGetProfile.getInterviewerProfile).toHaveBeenCalled();
  });
});

export class ProfileServiceMock {}
