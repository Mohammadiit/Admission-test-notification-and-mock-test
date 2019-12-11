import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {snackbar} from '../../config/interfaces/user.interface';
import {SnackbarComponent} from '../components/snackbar/snackbar.component';
import {FormControl, FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private snackbar: MatSnackBar) { }
  openSnackBar(configuration: snackbar) {
    this.snackbar.openFromComponent(SnackbarComponent, {
      duration: (configuration.duration ? configuration.duration : 1) * 1000,
      data: configuration.data,
      horizontalPosition: configuration.horizontalPosition ? configuration.horizontalPosition : 'right',
      verticalPosition: configuration.verticalPosition ? configuration.verticalPosition : 'bottom',
      panelClass: configuration.panelClass ? configuration.panelClass : null
    });
  }
  openSnackBarLattest(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 2000,
    });
  }
  openSnackBarLonger(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 10000,
    });
  }

}

export class FieldMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return form.hasError('not_matching') && control.touched
      ? form.hasError('not_matching')
      : control && control.invalid && control.touched ? control.invalid : false;
  }
}
