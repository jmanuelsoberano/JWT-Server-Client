import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { AppUserAuth } from '../models/app-user-auth';
import { AppUser } from '../models/app-user';
import { tap, catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';

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

  resetSecutityObject() {
    this.securityObject.userName = '';
    this.securityObject.bearerToken = '';
    this.securityObject.isAuthenticated = false;
    this.securityObject.claims = [];
  }

  login(entity: AppUser) {

    this.resetSecutityObject();

    return this.http.post(`${APi_URL}login`, entity, httpOptions)
      .pipe(
        tap((resp: AppUserAuth) => {
          Object.assign(this.securityObject, resp);
          localStorage.setItem('bearerToken', this.securityObject.bearerToken);
        }),
        catchError(this.handleError)
      )
  }

  logout() {
    this.resetSecutityObject();
    localStorage.removeItem('bearerToken');
  }

  handleError(err: any) {
    return throwError(err.error);
  }

  // *hasClaim="'claimType'"  // Assumes claimValue is true
  // *hasClaim="'claimType:value'"  // Compares claimValue to value
  // *hasClaim="['claimType1','claimType2:value','claimType3']"  
  hasClaim(cliamType: any, claimValue?: any) {
    let ret: boolean = false;

    if (typeof cliamType === 'string') {
      ret = this.isClaimValid(cliamType, claimValue);
    } else {
      let claims: string[] = cliamType;
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

  isClaimValid(cliamType: string, claimValue?: string) {
    let ret: boolean = false;
    let auth: AppUserAuth = null;

    auth =  this.securityObject;
    if (auth) {
      if (cliamType.indexOf(':') >= 0) {
        let words: string[] = cliamType.split(':');
        cliamType = words[0].toLowerCase();
        claimValue = words[1];
      } else {
        cliamType = cliamType.toLowerCase();
        claimValue = claimValue ? claimValue : 'true';
      }
      ret = auth.claims.find( c => c.claimType.toLowerCase() == cliamType && c.claimValue == claimValue) != null;
    }

    return ret;
  }

}
