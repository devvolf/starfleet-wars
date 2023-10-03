import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Starship } from 'src/app/models/starship.model';
import { StarshipsFacade } from 'src/app/states/starships/starships.facade';

@Component({
  selector: 'app-starship-selection',
  templateUrl: './starship-selection.component.html',
  styleUrls: ['./starship-selection.component.scss'],
})
export class StarshipSelectionComponent {
  public starships$ = this.starshipsFacade.starships$;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: DialogRef,
    private starshipsFacade: StarshipsFacade
  ) {}

  public onStarshipSelected(starship: Starship): void {
    const { onSelected } = this.data;
    onSelected(starship);
    this.dialogRef.close();
  }
}
