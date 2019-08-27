import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../services/security.service';
import { AppUser } from '../models/app-user';
import { AppUserAuth } from '../models/app-user-auth';
import { Router } from '@angular/router';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: AppUser =  new AppUser();
  securityObject: AppUserAuth = null;
  returnUrl = '/categories';
  errorMessage = '';

  constructor(
    private service: SecurityService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  login() {
    this.errorMessage = '';
    this.service.login(this.user).subscribe(
      resp => {
        this.securityObject = resp;
        this.router.navigateByUrl(this.returnUrl);
      },
        error => this.errorMessage = error
    );
  }

}
