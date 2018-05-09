import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    constructor(private router: Router) {
    }

    goToRestaurant() {
        this.router.navigate(['restaurant']);
    }

    goToRoom() {
        this.router.navigate(['room', 'room1']);
    }

}
