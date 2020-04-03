import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthLocalProvider } from './authenticate/authlocal';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(public auth: AuthLocalProvider) {
      console.log('AuthGuard ()');

    }

    canActivate(): boolean {
      return this.auth.isAuthenticated();
    }

}
