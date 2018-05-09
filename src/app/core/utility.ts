import { URLSearchParams } from '@angular/http';

export class Utility {

    static isNull(item): boolean {
        return item === undefined || item === null;
    }

    static isEmpty(item): boolean {
        return item === undefined || item === null || item.length === 0 || item === 0 || item === '' || item === 'null';
    }

    static convertObjectToParams(paramObj: object) {
        let params = new URLSearchParams();
        for (let key in paramObj) {
            if (paramObj.hasOwnProperty(key)) {
                params.set(key, paramObj[key])
            }
        }
        return params;
    }

    static getParameter(paramName) {
        var searchString = window.location.search.substring(1),
            i, val, params = searchString.split("&");

        for (i = 0; i < params.length; i++) {
            val = params[i].split("=");
            if (val[0] == paramName) {
                return val[1];
            }
        }
        return null;
    }
}