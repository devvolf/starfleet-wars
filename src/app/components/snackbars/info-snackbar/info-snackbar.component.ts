import { Component, Inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-success-snackbar',
  templateUrl: './info-snackbar.component.html',
  styleUrls: ['./info-snackbar.component.scss'],
})
export class InfoSnackbarComponent {
  public message = '';

  constructor(
    public snackBarRef: MatSnackBarRef<InfoSnackbarComponent>,
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
