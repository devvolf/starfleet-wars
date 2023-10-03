import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { actions, types } from './match.actions';
import { mergeMap, of } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MatchService } from 'src/app/services/match.service';
import { Player } from 'src/app/models/player.model';

@Injectable()
export class MatchEffects {
  initializePlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.initializePlayers),
      mergeMap((action) => {
        const { starships } = action;

        const players = this.matchService.initializePlayers(starships);

        return of({
          type: types.PLAYERS_INITIALIZED,
          players,
        });
      })
    )
  );

  resolveFight$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.resolveFight),
      mergeMap((action) => {
        const { players } = action;

        const [winners, newPlayers] = this.matchService.resolveFight(players);

        this.notifyWinners(winners);

        return of({
          type: types.FIGHT_RESOLVED,
          payload: { winners, players: newPlayers },
        });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private matchService: MatchService,
    private snackbarService: SnackbarService
  ) {}

  private notifyWinners(winners: Player[]): void {
    if (winners.length === 1) {
      this.snackbarService.info(`${winners[0].name} wins the match!!`);
      return;
    }

    this.snackbarService.info(`It is a draw!`);
  }
}
