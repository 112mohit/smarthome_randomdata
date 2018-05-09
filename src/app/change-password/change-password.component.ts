import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../core/service/user.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { ValidationService } from '../shared/components/validation-message/validation-service';

@Component({
    selector: 'change-password',
    templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent {

    frmPassword: FormGroup;
    isFormSubmitted: boolean;
    errorMessage: string;
    successMessage: string;

    constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) {
        this.createForm();
    }

    createForm() {
        this.frmPassword = this.formBuilder.group({
            oldPassword: ['', [Validators.required]],
            newPassword: ['', [Validators.required, Validators.minLength(7)]],
            confirmPassword: ['', [Validators.required, ValidationService.compareNewPassword]]
        });
    }

    updatePassword() {
        this.isFormSubmitted = true;
        this.errorMessage = '';
        this.successMessage = '';
        if (!this.frmPassword.valid) {
            return;
        }
        let data = this.frmPassword.value;
        this.userService.changePassword(data)
            .subscribe(result => {
                this.successMessage = 'Password has been changed successfully.';
                this.createForm();
                this.isFormSubmitted = false;
            }, error => {
                this.errorMessage = error.error;
            })
    }

}
