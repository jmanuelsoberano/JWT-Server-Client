import { Component } from '@angular/core';
import { SecurityService } from './services/security.service';
import { AppUserAuth } from './models/app-user-auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  securityObject: AppUserAuth = null;

  constructor(private service: SecurityService) {
    this.securityObject = this.service.securityObject;
  }

  logout() {
    this.service.logout();
  }
}
