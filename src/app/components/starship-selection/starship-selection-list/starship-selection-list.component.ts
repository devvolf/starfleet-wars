import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Starship } from 'src/app/models/starship.model';

@Component({
  selector: 'app-starship-selection-list',
  templateUrl: './starship-selection-list.component.html',
  styleUrls: ['./starship-selection-list.component.scss'],
})
export class StarshipSelectionListComponent {
  @Input() starships: Starship[] = [];
  @Output() selected = new EventEmitter<Starship>();

  public onSelected(starship: Starship): void {
    this.selected.emit(starship);
  }

  public trackBy(index: number, item: Starship): string {
    return item.name;
  }
}
