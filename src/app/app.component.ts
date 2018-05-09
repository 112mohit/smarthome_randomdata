import { Component, OnDestroy } from '@angular/core';
import { EventService } from './core/event/event.service';
import { EventConstant } from './core/event/event-constant';
import { AuthService } from './core/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'app';
  sub: any;
  isLoggedIn: boolean = true;
  isAdmin: boolean = false;

  constructor(private eventService: EventService, private authService: AuthService) {
    this.subscribe();
  }

  subscribe() {
    this.sub = this.eventService.on(EventConstant.login)
      .subscribe(data => {
        this.isLoggedIn = data;
        if (this.isLoggedIn) {
          this.isAdmin = this.authService.getUser().roles.indexOf('admin') > -1;
        }
      });
  };

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
