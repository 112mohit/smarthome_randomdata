import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/service/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UsersComponent } from './users/users.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RoomComponent } from './room/room.component';

//routes
const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
    { path: 'room/:room', canActivate: [AuthGuard], component: RoomComponent },
    { path: 'restaurant', canActivate: [AuthGuard], component: RestaurantComponent },
    { path: 'users', canActivate: [AuthGuard], component: UsersComponent },
    { path: 'change-password', canActivate: [AuthGuard], component: ChangePasswordComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }


export const AppCompoents = [HomeComponent, LoginComponent, RestaurantComponent,
    ChangePasswordComponent, UsersComponent, RoomComponent]; 