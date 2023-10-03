import { createSelector } from '@ngrx/store';
import { Player } from 'src/app/models/player.model';

export type MatchState = {
  number: number;
  players: Player[];
};

export const selectMatch = (state: any) => state.match;

export const number = createSelector(
  selectMatch,
  (state: MatchState) => state.number
);

export const players = createSelector(
  selectMatch,
  (state: MatchState) => state.players
);
