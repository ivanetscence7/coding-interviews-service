import { Component, OnInit } from '@angular/core';
import { EditProfileDto } from '../dto/edit-profile.dto';
import { ProfileService } from '../service/profile.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { finalize, take } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: 'edit-profile.component.html',
})
export class EditProfileComponent {
  editProfileDto: EditProfileDto = {} as EditProfileDto;
  isLoading = false;

  constructor(private dialogRef: MatDialogRef<EditProfileComponent>, private profileService: ProfileService) {}

  edit(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.profileService
        .editProfile(this.editProfileDto)
        .pipe(
          take(1),
          finalize(() => (this.isLoading = false)),
        )
        .subscribe(response => {
          this.dialogRef.close(response);
        });
    }
  }
}
