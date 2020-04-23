import { Route } from '@angular/router';
import { CandidateListComponent } from './interviews/candidates/list/candidate-list.component';
import { AuthGuard } from './interviews/guards/auth.guard';
import { ProblemListComponent } from './interviews/problems/list/problem-list.component';
import { EditorComponent } from './interviews/editor/editor.component';
import { ProfileComponent } from './interviews/profile/profile.component';

export const AppRouting: Route[] = [
  {
    path: 'coding-interviews',
    children: [{ path: 'list', component: CandidateListComponent, canActivate: [AuthGuard] }],
  },
  {
    path: 'problems',
    component: ProblemListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admineditor',
    component: EditorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editor/:candidate',
    component: EditorComponent,
  },
];
