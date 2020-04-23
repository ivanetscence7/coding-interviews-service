import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonMaterialModule } from '../../common/material/common-material.module';
import { RegistrationRoute } from './registrationRoute';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { AuthResource } from '../resource/auth.resource';
import { BrowserModule } from '@angular/platform-browser';
import { RegistrationComponent } from './registration.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { AppHttpResource } from '../resource/app-http.resource';

@NgModule({
  imports: [
    CommonModule,
    CommonMaterialModule,
    RouterModule.forChild(RegistrationRoute),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MatToolbarModule,
    MatListModule,
  ],
  exports: [RegistrationComponent],
  declarations: [RegistrationComponent],
  providers: [AuthService, AuthResource, AppHttpResource],
})
export class RegistrationModule {}
