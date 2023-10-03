import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-match-view',
  templateUrl: './match-view.component.html',
  styleUrls: ['./match-view.component.scss'],
})
export class MatchViewComponent {
  @Input({ required: true }) players: Player[] = [];
  @Input({ required: true }) matchNumber = 1;
  @Output() fight = new EventEmitter<void>();

  public onFight(): void {
    this.fight.emit();
  }
}
