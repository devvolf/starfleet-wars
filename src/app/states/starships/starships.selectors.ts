import { createSelector } from '@ngrx/store';
import { Starship } from 'src/app/models/starship.model';

export type StarshipsState = {
  starships: Starship[];
  isLoading: boolean;
  error: null;
};

export const selectStarships = (state: any) => state.starships;

export const loading = createSelector(
  selectStarships,
  (state: StarshipsState) => state.isLoading
);

export const starships = createSelector(
  selectStarships,
  (state: StarshipsState) => state.starships
);
