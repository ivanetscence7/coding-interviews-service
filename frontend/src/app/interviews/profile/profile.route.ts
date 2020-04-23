import { Route } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AuthGuard } from '../guards/auth.guard';

export const ProfileRoute: Route[] = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
];
