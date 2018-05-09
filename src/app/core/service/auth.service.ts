import { Injectable } from "@angular/core";
import { CommonConstant } from "../constant/common.constant";
import { Utility } from "../utility";
import { User } from "../../model/user";

@Injectable()
export class AuthService {

    constructor() {
    }

    saveToken(token: string) {
        window.localStorage.setItem(CommonConstant.token, token);
    }

    saveUser(user: User) {
        window.localStorage.setItem(CommonConstant.user, JSON.stringify(user));
    }

    getToken(): string {
        return window.localStorage.getItem(CommonConstant.token);
    }

    getUser(): User {
        let user = window.localStorage.getItem(CommonConstant.user);
        if (!Utility.isEmpty(user)) {
            return JSON.parse(user);
        }
        return null;
    }

    isAdmin(): boolean {
        let user = this.getUser();
        if (Utility.isNull(user)) {
            return false;
        }
        return user.roles.indexOf('admin') > -1;
    }

    isLoggedIn(): boolean {
        return !Utility.isEmpty(this.getToken());
    }

    loggedOut(): void {
        window.localStorage.clear();
    }

}