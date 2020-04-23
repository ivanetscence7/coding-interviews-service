import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonMaterialModule } from '../../common/material/common-material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { EditProfileRoute } from './edit-profile.route';
import { EditProfileComponent } from './edit-profile.component';
import { ProfileService } from '../service/profile.service';
import { ProfileResource } from '../resource/profile.resource';
import { AppHttpResource } from '../resource/app-http.resource';

@NgModule({
  imports: [
    CommonModule,
    CommonMaterialModule,
    RouterModule.forChild(EditProfileRoute),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MatToolbarModule,
    MatListModule,
  ],
  exports: [EditProfileComponent],
  declarations: [EditProfileComponent],
  providers: [ProfileService, ProfileResource, AppHttpResource],
})
export class EditProfileModule {}
