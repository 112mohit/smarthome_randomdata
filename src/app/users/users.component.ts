import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../core/service/user.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { ValidationService } from '../shared/components/validation-message/validation-service';

@Component({
    selector: 'users',
    templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

    frmUser: FormGroup;
    isFormSubmitted: boolean;
    errorMessage: string;
    users: User[] = [];
    isEditMode: boolean = false;
    userData: User = null;

    constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) {
        this.createForm();
    }

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers() {
        this.userService.getUsers()
            .subscribe(result => {
                this.users = result;
            })
    }

    createForm() {
        this.frmUser = this.formBuilder.group({
            name: ['', [Validators.required]],
            username: ['', [Validators.required]],
            emailId: ['', [Validators.required, ValidationService.emailValidator]],
            password: ['', [Validators.required, Validators.minLength(7)]],
            confirmPassword: ['', [Validators.required, ValidationService.comparePassword]]
        });
    }

    editForm() {
        this.frmUser = this.formBuilder.group({
            name: ['', [Validators.required]],
            username: [{ value: '', disabled: true }, [Validators.required]],
            emailId: ['', [Validators.required, ValidationService.emailValidator]]
        });
    }

    reset() {
        this.isEditMode = false;
        this.isFormSubmitted = false;
        this.getUsers();
        this.createForm();
    }

    deleteUser(item: User) {
        var c = confirm('Are you sure, you want to delete user?')
        if (c) {
            this.userService.removeUser(item._id)
                .subscribe(result => {
                    this.reset();
                })
        }
    }

    editUser(item: User) {
        this.userData = { ...item };
        this.isEditMode = true;
        this.isFormSubmitted = true;
        this.editForm();
        this.frmUser.patchValue({
            name: this.userData.name,
            emailId: this.userData.emailId,
            username: this.userData.username
        });
    }

    addUser() {
        this.isEditMode = false;
        this.createForm();
        this.isFormSubmitted = false;
        this.userData = null;
    }

    saveUser() {
        this.isFormSubmitted = true;
        this.errorMessage = '';
        if (!this.frmUser.valid) {
            return;
        }
        this.userData = Object.assign(this.userData || {}, this.userData || {}, this.frmUser.value);
        if (this.isEditMode) {
            this.userService.updateUser(this.userData._id, this.userData)
                .subscribe(result => {
                    this.reset();
                }, error => {
                    this.errorMessage = error.error;
                })
        } else {
            this.userService.createUser(this.userData)
                .subscribe(result => {
                    this.reset();
                }, error => {
                    this.errorMessage = error.error;
                })
        }
    }

}
