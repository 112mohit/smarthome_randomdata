import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { APIConstant } from "../constant/api.constant";
import { Observable } from "rxjs/Observable";


@Injectable()
export class RestaurantService {

    constructor(private baseService: BaseService) {
    }


    toggleLight(table: string, type: string, on: boolean): Observable<any> {
        return this.baseService.post<any>(`${APIConstant.restaurant}/${table}/${type}/${on}`, null);
    }


}