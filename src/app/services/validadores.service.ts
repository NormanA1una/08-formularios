import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string]: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ValidadoresService {
  constructor() {}
  noNorman(control: FormControl): ErrorValidate | null {
    if (control.value?.toLowerCase() === 'norman2') {
      return {
        noNorman: true,
      };
    }

    return null;
  }

  passwordIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Ctrl = formGroup.controls[pass1Name];
      const pass2Ctrl = formGroup.controls[pass2Name];

      if (pass1Ctrl.value === pass2Ctrl.value) {
        pass2Ctrl.setErrors(null);
      } else {
        pass2Ctrl.setErrors({ noEsIgual: true });
      }
    };
  }

  existeUsuario(
    control: FormControl
  ): Promise<ErrorValidate | null> | Observable<ErrorValidate | null> {
    if (!control.value) {
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Zoe') {
          resolve({ existe: true });
        } else {
          resolve(null);
        }
      }, 3500);
    });
  }
}
