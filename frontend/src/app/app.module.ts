import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InterviewModule } from './interviews/interview.module';
import { CandidateListModule } from './interviews/candidates/list/candidate-list.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonMaterialModule } from './common/material/common-material.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RegistrationModule } from './interviews/registration/registration.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRouting } from './app.routing';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginModule } from './interviews/login/login.module';
import { JwtModule } from '@auth0/angular-jwt';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditProfileModule } from './interviews/edit-profile/edit-profile.module';
import { ProfileModule } from './interviews/profile/profile.module';
import { environment } from '../environments/environment';
import { ProblemModule } from './interviews/problems/problem.module';
import { EditorModule } from './interviews/editor/editor.module';
import { AuthGuard } from './interviews/guards/auth.guard';
import { SocketIoService } from './interviews/service/socketio.service';
import { SessionService } from './interviews/service/session.service';
import { InterviewInfoModule } from './interviews/interview.info/interview-info.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonMaterialModule,
    InterviewModule,
    CandidateListModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    RegistrationModule,
    FormsModule,
    HttpClientModule,
    LoginModule,
    ProblemModule,
    FontAwesomeModule,
    EditProfileModule,
    ProfileModule,
    EditorModule,
    InterviewInfoModule,
    RouterModule.forChild(AppRouting),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem(environment.access_token);
        },
        whitelistedDomains: [environment.whitelistedDomains_url],
        blacklistedRoutes: [environment.blacklistedRoutes_url],
      },
    }),
    FontAwesomeModule,
  ],
  providers: [AuthGuard, SocketIoService, SessionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
