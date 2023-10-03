import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { actions, types } from './starships.actions';
import { catchError, forkJoin, mergeMap, of, switchMap } from 'rxjs';
import { StarshipsService } from 'src/app/services/starships.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Injectable()
export class StarshipsEffects {
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getAllRequest),
      mergeMap(() => {
        return this.starshipsService.getAll().pipe(
          switchMap((response) => {
            const { results } = response;
            const detailsCalls = results.map((it) =>
              this.starshipsService.getById(it.uid)
            );

            return forkJoin(detailsCalls);
          }),
          switchMap((responses) => {
            const payload = responses.map((it) => it.result.properties);

            return of({
              type: types.GET_ALL_STARSHIPS_SUCCESS,
              payload,
            });
          }),
          catchError((error) => {
            const {
              message,
              error: { message: errorMessage },
            } = error;

            this.snackbarService.fail(message || errorMessage);

            return of({
              type: types.GET_ALL_STARSHIPS_FAILURE,
              error,
            });
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private starshipsService: StarshipsService,
    private snackbarService: SnackbarService
  ) {}
}
