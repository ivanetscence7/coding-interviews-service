import { Component } from '@angular/core';
import { faDragon } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './interviews/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public authService: AuthService) {}
  faDragon = faDragon;
}
