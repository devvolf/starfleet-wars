import { Component, OnInit } from '@angular/core';
import { StarshipsFacade } from './states/starships/starships.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public loading$ = this.starshipsFacade.loading$;

  constructor(private starshipsFacade: StarshipsFacade) {}

  public ngOnInit(): void {
    this.starshipsFacade.getStarships();
  }
}
