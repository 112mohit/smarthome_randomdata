

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './service/auth-guard.service';
import { LoginService } from './service/login.service';
import { BaseService } from './service/base.service';
import { AuthService } from './service/auth.service';
import { HttpModule } from '@angular/http';
import { EventService } from './event/event.service';
import { SharedModule } from '../shared/shared.module';

import { SensorService } from './service/sensor.service';
import { UserService } from './service/user.service';
import { RestaurantService } from './service/restaurant.service';

@NgModule({
    imports: [
        HttpModule,
        HttpClientModule
    ],
    providers: [
        EventService,
        AuthGuard,
        LoginService,
        SensorService,
        RestaurantService,
        BaseService,
        AuthService,
        UserService
    ]
})
export class CoreModule { }
