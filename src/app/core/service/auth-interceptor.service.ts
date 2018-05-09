

import { Injectable } from "@angular/core";
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { CommonConstant } from "../constant/common.constant";
import { APIConstant } from "../constant/api.constant";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Ignore Login and Get Token
        if (req.url.indexOf(APIConstant.login) > -1) {
            return next.handle(req);
        }
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${window.localStorage.getItem(CommonConstant.token)}`) });
        }
        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        return next.handle(req);
    }
}