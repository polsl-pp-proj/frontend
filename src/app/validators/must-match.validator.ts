import {
    AbstractControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';

export function mustMatch(
    controlName: string,
    matchingControlName: string,
    returnValues: boolean = true
): ValidatorFn {
    return (controlOrGroup: AbstractControl) => {
        if (controlOrGroup instanceof FormGroup) {
            const control = controlOrGroup.controls[controlName];
            const matchingControl =
                controlOrGroup.controls[matchingControlName];
            if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
                matchingControl.setErrors(matchingControl.errors);
                return matchingControl.errors;
            }

            if (control.value !== matchingControl.value) {
                const error = <ValidationErrors>{
                    mustMatch: {
                        fields: [controlName, matchingControlName],
                    },
                };
                if (returnValues) {
                    error['mustMatch'] = {
                        ...error['mustMatch'],
                        values: [control.value, matchingControl.value],
                    };
                }
                matchingControl.setErrors(error);
                return error;
            } else {
                matchingControl.setErrors(null);
                return null;
            }
        }
        return null;
    };
}