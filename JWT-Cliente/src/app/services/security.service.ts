import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { AppUserAuth } from '../models/app-user-auth';
import { AppUser } from '../models/app-user';
import { tap, catchError } from 'rxjs/operators'
import { Observable, of, throwError } from 'rxjs';

const APi_URL = 'https://localhost:44346/api/security/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  securityObject: AppUserAuth = new AppUserAuth();

  constructor(private http: HttpClient) { }

  login(entity: AppUser): Observable<AppUserAuth> {    

    this.resetSecutityObject();

    return this.http.post<AppUserAuth>(`${APi_URL}login`, entity, httpOptions)
      .pipe(
        tap((resp: AppUserAuth) => {
          Object.assign(this.securityObject, resp);
          localStorage.setItem('bearerToken', this.securityObject.bearerToken);
        }),
        catchError(this.handleError),        
      )
  }

  private resetSecutityObject() {
    this.securityObject.userName = '';
    this.securityObject.bearerToken = '';
    this.securityObject.isAuthenticated = false;
    this.securityObject.claims = [];
    localStorage.removeItem('bearerToken');
  }

  handleError(err: any) {
    return throwError(err.error);
  }

}
