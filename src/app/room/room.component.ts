import { Component, OnInit, OnDestroy } from '@angular/core';
import { Utility } from '../core/utility';
import { SensorReadData } from '../model/sensor';
import { SensorService } from '../core/service/sensor.service';
import { ActivatedRoute } from '@angular/router';
import { SnotifyService } from 'ng-snotify';

@Component({
    selector: 'room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnDestroy {

    sensorReadData: SensorReadData;
    room: string;
    interval: any;
    tv: boolean = false;
    light: boolean = false;
    heating: boolean = false;
    ac: boolean = false;
    humidityGuage: any = {
        gaugeType: "semi",
        gaugeValue: 0,
        gaugeLabel: "Humidity",
        gaugeAppendText: "%"
    }

    temperatureGuage: any = {
        gaugeType: "semi",
        gaugeValue: 0,
        gaugeLabel: "Temperature",
        gaugeAppendText: "C"
    }

    lineChartData: Array<any> = [
        { data: [], label: 'Temperature' },
        { data: [], label: 'Humidity' }
    ];
    lineChartLabels: Array<any> = [];
    lineChartOptions: any = {
        responsive: true
    };
    routeSub: any;

    constructor(private sensorService: SensorService, private route: ActivatedRoute,
        private snotifyService: SnotifyService) {
        this.routeSub = this.route.params.subscribe(param => {
            this.room = param['room'];
            this.getData();
            if (Utility.isNull(this.interval)) {
                clearInterval(this.interval);
            }
            this.refreshData();
            this.getHistortData();
            this.tv = false;
            this.light = false;
            this.heating = false;
            this.ac = false;
        })
    }

    ngOnInit(): void {
    }

    getData() {
        this.sensorService.getSensorData(this.room)
            .subscribe(result => {
                this.sensorReadData = result;
                this.temperatureGuage.gaugeValue = this.sensorReadData.readData.temperature;
                this.humidityGuage.gaugeValue = this.sensorReadData.readData.humidity;
            });
    }

    getHistortData() {
        let dateStr = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
        this.sensorService.getHistoryData(this.room, dateStr)
            .subscribe(result => {
                this.lineChartData[0].data = [];
                this.lineChartData[1].data = [];
                this.lineChartLabels = [];
                (result || []).forEach(item => {
                    this.lineChartData[0].data.push(item.temperature);
                    this.lineChartData[1].data.push(item.humidity);
                    this.lineChartLabels.push(new Date(item.created).getHours() + ':' + new Date(item.created).getMinutes());
                });
            })
    }

    refreshData() {
        this.interval = setInterval(() => {
            this.getData();
        }, 15000);
    }

    setTV() {
        this.sensorService.setTV(this.room, !this.tv)
            .subscribe(result => {
                this.tv = !this.tv;
                this.snotifyService.success(result, 'TV');
            });
    }

    setAc() {
        this.sensorService.setAc(this.room, !this.ac)
            .subscribe(result => {
                this.ac = !this.ac;
                this.snotifyService.success(result, 'AC');
            });
    }

    setHeating() {
        this.sensorService.setHeating(this.room, !this.heating)
            .subscribe(result => {
                this.heating = !this.heating;
                this.snotifyService.success(result, 'Heating');
            });
    }

    setLight() {
        this.sensorService.setLight(this.room, !this.light)
            .subscribe(result => {
                this.light = !this.light;
                this.snotifyService.success(result, 'Light');
            });
    }

    ngOnDestroy(): void {
        if (Utility.isNull(this.interval)) {
            clearInterval(this.interval);
        }
        this.routeSub.unsubscribe();
    }


}
