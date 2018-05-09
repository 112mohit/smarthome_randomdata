import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { APIConstant } from "../constant/api.constant";
import { Observable } from "rxjs/Observable";
import { Utility } from "../utility";
import { User } from "../../model/user";


@Injectable()
export class UserService {

    constructor(private baseService: BaseService) {

    }

    me(): Observable<any> {
        return this.baseService.get(`${APIConstant.me}`);
    }

    getUsers(): Observable<any> {
        return this.baseService.get(`${APIConstant.user}`);
    }

    createUser(user: User): Observable<any> {
        return this.baseService.post(`${APIConstant.user}`, user);
    }

    updateUser(id: string, user: User): Observable<any> {
        return this.baseService.put(`${APIConstant.user}/${id}`, user);
    }

    removeUser(id: string): Observable<any> {
        return this.baseService.delete(`${APIConstant.user}/${id}`);
    }

    changePassword(data): Observable<any> {
        return this.baseService.post(`${APIConstant.changePassword}`, data);
    }

}