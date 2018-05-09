import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../../core/service/login.service';
import { AuthService } from '../../../core/service/auth.service';
import { Router } from '@angular/router';
import { EventService } from '../../../core/event/event.service';
import { EventConstant } from '../../../core/event/event-constant';

@Component({
    selector: 'header-bar',
    templateUrl: './header-bar.component.html',
    styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit, OnDestroy {
    isAdmin: boolean = false;
    sub: any;
    constructor(private eventService: EventService, private authService: AuthService, private router: Router) {
        this.subscribe();
    }

    ngOnInit(): void {
        this.isAdmin = this.authService.isAdmin();
    }

    logOut() {
        this.authService.loggedOut();
        this.router.navigate(['login']);
    }

    subscribe() {
        this.sub = this.eventService.on(EventConstant.login)
            .subscribe(data => {
                if (data) {
                    this.isAdmin = this.authService.isAdmin();
                }
            });
    };

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
