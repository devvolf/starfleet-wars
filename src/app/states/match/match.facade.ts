import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatchState, number, players } from './match.selectors';
import { Player } from 'src/app/models/player.model';
import { Starship } from 'src/app/models/starship.model';
import { actions } from './match.actions';
import { StarshipsFacade } from '../starships/starships.facade';
import { takeWhile, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MatchFacade {
  public matchNumber$ = this.store.select(number);
  public players$ = this.store.select(players);
  private players: Player[] = [];
  private firstMatchInitialized = false;

  constructor(
    private store: Store<MatchState>,
    private starshipsFacade: StarshipsFacade
  ) {
    this.starshipsFacade.starships$
      .pipe(
        takeWhile(
          (starships) =>
            starships.length > 1 || this.firstMatchInitialized === false,
          true
        ),
        tap((starships) => {
          if (starships.length > 1) {
            this.firstMatchInitialized = true;
            this.store.dispatch(actions.initializePlayers({ starships }));
          }
        })
      )
      .subscribe();

    this.players$.pipe(tap((data) => (this.players = data))).subscribe();
  }

  public changePlayerStarship(player: Player, starship: Starship): void {
    this.store.dispatch(actions.changePlayerStarship({ player, starship }));
  }

  public resolveFight(): void {
    if (this.players.length < 2) {
      return;
    }

    this.store.dispatch(actions.resolveFight({ players: this.players }));
  }
}
