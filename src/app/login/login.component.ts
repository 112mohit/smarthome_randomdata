import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../core/service/auth.service';
import { LoginService } from '../core/service/login.service';
import { UserService } from '../core/service/user.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { EventService } from '../core/event/event.service';
import { EventConstant } from '../core/event/event-constant';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    frmLogin: FormGroup;
    isFormSubmitted: boolean;
    errorMessage: string;

    constructor(private router: Router, private formBuilder: FormBuilder, private loginService: LoginService,
        private authService: AuthService, private userService: UserService,
        private eventService: EventService) {
        this.createForm();
        this.eventService.broadcast(EventConstant.login, false);
    }

    createForm() {
        this.frmLogin = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    login() {
        this.isFormSubmitted = true;
        this.errorMessage = '';
        if (!this.frmLogin.valid) {
            return;
        }
        let loginData = this.frmLogin.value;
        this.loginService.login(loginData)
            .subscribe(result => {
                this.authService.saveToken(result.token);
                setTimeout(() => {
                    this.userService.me()
                        .subscribe((user: User) => {
                            this.authService.saveUser(user);
                            this.eventService.broadcast(EventConstant.login, true);
                            this.router.navigate(['home']);

                        }, error => {

                        });
                });
            }, error => {
                this.errorMessage = error.error;
            })
    }

}
