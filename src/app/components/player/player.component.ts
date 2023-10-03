import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Player } from 'src/app/models/player.model';
import { Starship } from 'src/app/models/starship.model';
import { MatchFacade } from 'src/app/states/match/match.facade';
import { StarshipSelectionComponent } from '../starship-selection/starship-selection.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  @Input({ required: true }) player!: Player;

  constructor(private matchFacade: MatchFacade, private dialog: MatDialog) {}

  ngOnInit(): void {}

  public onStarshipChange(): void {
    const onSelected = (starship: Starship) =>
      this.matchFacade.changePlayerStarship(this.player, starship);
    this.dialog.open(StarshipSelectionComponent, {
      data: { onSelected },
      maxHeight: '90vh',
    });
  }
}
