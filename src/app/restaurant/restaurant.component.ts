import { Component, OnInit } from '@angular/core';
import { Utility } from '../core/utility';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../core/service/restaurant.service';
import { SnotifyService } from 'ng-snotify';


@Component({
    selector: 'restaurant',
    templateUrl: './restaurant.component.html',
    styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

    types = {
        table1: {
            'starter': false,
            'maincourse': false,
            'dessert': false
        },
        table2: {

            'starter': false,
            'maincourse': false,
            'dessert': false
        }
    }
    current = {
        table1: null,
        table2: null
    }

    constructor(private restaurantService: RestaurantService, private snotifyService: SnotifyService) {
    }

    ngOnInit(): void {
    }

    toggleLight(table, type) {
        this.restaurantService.toggleLight(table, type, !this.types[type])
            .subscribe(result => {
                this.current[table] = '';
                Object.keys(this.types[table]).forEach(key => {
                    this.types[table][key] = key === type && !this.types[table][type];
                    if (this.types[table][key]) {
                        this.current[table] = key;
                    }
                })
                this.snotifyService.success(result, type);
            });
    }

}
