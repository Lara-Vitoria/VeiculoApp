import { AbstractControl, FormGroup } from "@angular/forms";

export class ValidatorField {
    static DeveCombinar(controlName: string, mesmoControlName: string): any {
        return (grupo: AbstractControl) => {
            const formGroup = grupo as FormGroup;
            const control = formGroup.controls[controlName];
            const mesmoControl = formGroup.controls[mesmoControlName];

            if (mesmoControl.errors && !mesmoControl.errors['deveCombinar'])
                return null;

            if (control.value !== mesmoControl.value) {
                mesmoControl.setErrors({ deveCombinar: true });
            } else {
                mesmoControl.setErrors(null);
            }

            return null;
        }
    }
}