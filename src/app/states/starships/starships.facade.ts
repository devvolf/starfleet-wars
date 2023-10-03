import { Injectable } from '@angular/core';
import { StarshipsState, loading, starships } from './starships.selectors';
import { Store } from '@ngrx/store';
import { actions } from './starships.actions';

@Injectable({
  providedIn: 'root',
})
export class StarshipsFacade {
  public loading$ = this.store.select(loading);
  public starships$ = this.store.select(starships);

  constructor(private store: Store<StarshipsState>) {}

  public getStarships(): void {
    this.store.dispatch(actions.getAllRequest());
  }
}
