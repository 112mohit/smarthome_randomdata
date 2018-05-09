

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationMessage } from './components/validation-message/validation-message';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';
import { NgxGaugeModule } from 'ngx-gauge';


const sharedModule = [CommonModule, FormsModule, ReactiveFormsModule,
    RouterModule, NgxGaugeModule];

const shared = [ValidationMessage, HeaderBarComponent, FooterBarComponent];

@NgModule({
    imports: [
        ...sharedModule
    ],
    declarations: [
        ...shared
    ],
    exports: [
        ...sharedModule,
        ...shared
    ]
})
export class SharedModule { }
