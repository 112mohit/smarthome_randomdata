import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
// Import our authentication service

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate(): boolean {
        // If the user is not logged in we'll send them back to the home page

        if (!this.auth.isLoggedIn()) {
            //Redirect to login page
            this.router.navigate(['login']);
            return;
        }
        return true;
    }

}