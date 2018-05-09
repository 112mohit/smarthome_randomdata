import { FormControl } from "@angular/forms";

export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any, message?: string) {
        let config = {
            'required': `${message} is required`,
            'invalidEmailAddress': 'Invalid email address',
            'minlength': `Minimum length ${validatorValue.requiredLength}`,
            'mismatchedPassword': 'Password is not matching',
            'onlyNumber': 'Only Numbers allowed'
        };

        return config[validatorName];
    }

    static emailValidator(control) {
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }


    static compareNewPassword(control) {
        if (!control.root || !control.root.controls) {
            return null;
        }
        const exactMatch = control.root.controls.newPassword.value === control.value;
        return exactMatch ? null : { mismatchedPassword: true };
    }

    static comparePassword(control) {
        if (!control.root || !control.root.controls) {
            return null;
        }
        const exactMatch = control.root.controls.password.value === control.value;
        return exactMatch ? null : { mismatchedPassword: true };
    }

    static allowOnlyNumber(control) {
        if (control.value) {
            let tokenValue: number = control.value.trim();
            if (!isNaN(tokenValue)) {
                return null;
            }
        }
        return { 'onlyNumber': true };
    }

}
