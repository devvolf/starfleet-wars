import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { Starship } from 'src/app/models/starship.model';

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.scss'],
})
export class PlayerViewComponent {
  @Input({ required: true }) player!: Player;

  @Output() starshipChange = new EventEmitter<void>();

  public onStarshipChange(): void {
    this.starshipChange.emit();
  }
}
