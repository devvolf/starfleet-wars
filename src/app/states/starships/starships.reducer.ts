import { createReducer, on } from '@ngrx/store';
import { StarshipsState } from './starships.selectors';
import { actions } from './starships.actions';

export const initialState: StarshipsState = {
  starships: [],
  isLoading: false,
  error: null,
};

export const starshipsReducer = createReducer(
  initialState,
  on(actions.getAllRequest, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(actions.getAllSuccess, (state, action) => ({
    ...state,
    starships: action.payload,
    isLoading: false,
  }))
);
