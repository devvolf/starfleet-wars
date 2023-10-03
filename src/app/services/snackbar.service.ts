import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FailureSnackbarComponent } from '../components/snackbars/failure-snackbar/failure-snackbar.component';
import { InfoSnackbarComponent } from '../components/snackbars/info-snackbar/info-snackbar.component';

const DURATION = 2000;

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private readonly defaultFailMessage = 'Something went wrong';

  constructor(private snackbar: MatSnackBar) {}

  public fail(message?: string): void {
    this.snackbar.openFromComponent(FailureSnackbarComponent, {
      data: { message: message || this.defaultFailMessage },
    });
  }

  public info(message: string): void {
    this.snackbar.openFromComponent(InfoSnackbarComponent, {
      data: { message },
      duration: DURATION,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
