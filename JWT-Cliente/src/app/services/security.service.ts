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

  hasClaim(claimType: any, claimValue?: any) {
    let ret: boolean = false;

    if (typeof claimType === 'string') {
      ret = this.isClaimValid(claimType, claimValue);
    } else {
      let claims: string[] = claimType;
      if (claims) {
        for (let index = 0; index < claims.length; index++) {
          ret = this.isClaimValid(claims[index]);
          if (ret) {
            break;
          }
        }
      }
    }

    return ret;
  }

  isClaimValid(claimType: string, claimValue?: string): boolean {
    let ret: boolean = false;
    let auth: AppUserAuth = null;

    auth = this.securityObject;
    if (auth) {
      if (claimType.indexOf(':') >= 0) {
        let words: string[] = claimType.split(':');
        claimType = words[0].toLowerCase();
        claimValue = words[1];
      } else {
        claimType = claimType.toLowerCase();
        claimValue = claimValue ? claimValue : 'true';
      }
      ret = auth.claims.find( c => 
        c.claimType.toLowerCase() == claimType && c.claimValue == claimValue) != null;
    }

    return ret;
  }
  
  logout() {
    this.resetSecutityObject();
  }

  handleError(err: any) {
    return throwError(err.error);
  }

}
