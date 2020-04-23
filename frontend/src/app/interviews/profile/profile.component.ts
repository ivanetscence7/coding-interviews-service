import { Component, OnInit } from '@angular/core';
import { RegistrationInterviewerDto } from '../dto/registration-interviewer.dto';
import { ProfileService } from '../service/profile.service';
import { finalize, take } from 'rxjs/operators';
import { EditProfileDto } from '../dto/edit-profile.dto';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.scss'],
})
export class ProfileComponent implements OnInit {
  isLoading = false;
  interviewerDto: RegistrationInterviewerDto = {} as RegistrationInterviewerDto;
  editProfileDto: BehaviorSubject<EditProfileDto> = new BehaviorSubject<EditProfileDto>(null);

  constructor(private profileService: ProfileService, private matDialog: MatDialog) {}

  ngOnInit() {
    this.isLoading = true;
    this.profileService
      .getInterviewerInfo()
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe(interviewer => {
        if (interviewer) {
          this.interviewerDto = interviewer;
        }
      });

    this.profileService
      .getInterviewerProfile()
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe(profile => {
        if (profile) {
          this.editProfileDto.next(profile);
        }
      });
  }

  public getProfile(): Observable<EditProfileDto> {
    return this.editProfileDto.asObservable();
  }

  openEditProfileDialog() {
    this.matDialog
      .open(EditProfileComponent)
      .afterClosed()
      .pipe(take(1))
      .subscribe((profile: EditProfileDto) => {
        if (profile) {
          this.editProfileDto.next(profile);
        }
      });
  }
}
