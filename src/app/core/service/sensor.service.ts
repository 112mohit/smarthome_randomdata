import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { APIConstant } from "../constant/api.constant";
import { Observable } from "rxjs/Observable";
import { Sensor, SensorReadData } from "../../model/sensor";


@Injectable()
export class SensorService {

    constructor(private baseService: BaseService) {
    }

    getSensorData(room): Observable<SensorReadData> {
        return this.baseService.get<SensorReadData>(`${APIConstant.sensorData}/${room}`);
    }

    setTV(room: string, on: boolean): Observable<any> {
        return this.baseService.post<any>(`${APIConstant.tv}/${room}/${on}`, null);
    }

    setLight(room: string, on: boolean): Observable<any> {
        return this.baseService.post<any>(`${APIConstant.light}/${room}/${on}`, null);
    }

    setAc(room: string, on: boolean): Observable<any> {
        return this.baseService.post<any>(`${APIConstant.ac}/${room}/${on}`, null);
    }

    setHeating(room: string, on: boolean): Observable<any> {
        return this.baseService.post<any>(`${APIConstant.heating}/${room}/${on}`, null);
    }

    getHistoryData(room: string, date: string): Observable<any> {
        return this.baseService.get<any>(`${APIConstant.history}/${room}/${date}`);
    }

}