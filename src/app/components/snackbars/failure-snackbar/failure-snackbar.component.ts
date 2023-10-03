import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-failure-snackbar',
  templateUrl: './failure-snackbar.component.html',
  styleUrls: ['./failure-snackbar.component.scss'],
})
export class FailureSnackbarComponent implements OnInit {
  public message = 'Something went wrong';

  constructor(
    public snackBarRef: MatSnackBarRef<FailureSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) private data: any
  ) {}

  public ngOnInit(): void {
    const { message } = this.data;

    if (!message) {
      return;
    }

    this.message = message;
  }
}
