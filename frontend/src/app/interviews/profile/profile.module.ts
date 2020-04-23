import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonMaterialModule } from '../../common/material/common-material.module';
import { RouterModule } from '@angular/router';
import { RegistrationRoute } from '../registration/registrationRoute';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { ProfileRoute } from './profile.route';
import { ProfileComponent } from './profile.component';
import { ProfileService } from '../service/profile.service';
import { InterviewerResource } from '../resource/interviewer.resource';
import { ProfileResource } from '../resource/profile.resource';
import { AppHttpResource } from '../resource/app-http.resource';
import { AuthGuard } from '../guards/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    CommonMaterialModule,
    RouterModule.forChild(ProfileRoute),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MatToolbarModule,
    MatListModule,
  ],
  exports: [ProfileComponent],
  declarations: [ProfileComponent],
  providers: [ProfileService, InterviewerResource, ProfileResource, AppHttpResource, AuthGuard],
})
export class ProfileModule {}
