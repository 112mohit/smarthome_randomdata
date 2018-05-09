import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppCompoents, AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AuthInterceptor } from './core/service/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResponseInterceptor } from './core/service/response-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SnotifyModule, SnotifyService } from 'ng-snotify';



@NgModule({
  declarations: [
    AppComponent,
    [...AppCompoents]
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SnotifyModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    ChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    },
    //{ provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
