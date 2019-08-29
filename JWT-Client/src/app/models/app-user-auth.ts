import { AppUserClaims } from './app-user-claims';

export class AppUserAuth {
    userName: string = '';
    bearerToken: string = '';
    isAuthenticated: boolean = false;
    claims: AppUserClaims[] = [];
}
