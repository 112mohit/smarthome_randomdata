import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { APIConstant } from "../constant/api.constant";
import { Observable } from "rxjs/Observable";
import { Utility } from "../utility";


@Injectable()
export class LoginService {

    constructor(private baseService: BaseService) {

    }

    login(data: any): Observable<any> {
        return this.baseService.post(`${APIConstant.login}`, data);
    }

    register(user: any): Observable<any> {
        let url = `${APIConstant.register}`;
        return this.baseService.post(url, user);
    }

}