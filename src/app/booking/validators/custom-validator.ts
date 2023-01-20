import { AbstractControl, FormGroup } from "@angular/forms";

export class CustomValidator {

    //abstract control is base class for everything
    static validateName(control: AbstractControl) {
        //control.value takes the value of the control
        const value = control.value as string;
        if (value.includes('test')) {
            return { invalidName: true }
        }
        return null;
    }

    // validator that accepts a parameter
    static validateSpecialChar(char: string) {
        //validator will check control for char added
        return (control: AbstractControl) => {
            const value = control.value as string;
            if (value.includes(char)) {
                return { invalidSpecialChar: true }
            }
            return null;
        }


    }

    static validateDate(control: FormGroup) {
        const checkinDate: any = new Date(control.get('checkinDate')?.value);
        const checkoutDate: any = new Date(control.get('checkoutDate')?.value);
        const diffTime = (checkoutDate - checkinDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log(diffDays);
        console.log(diffTime);
        console.log(checkinDate);
        console.log(checkoutDate);
        if (diffDays <= 0) {
            //add error message to control
            control.get('checkoutDate')?.setErrors({ invalidateDate: true });
            return { invalidateDate: true };
        }
        return null;
    }

}


