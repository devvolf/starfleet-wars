import { createAction, props } from '@ngrx/store';
import { Starship } from 'src/app/models/starship.model';

const STATE_LABEL = 'Starships';

const GET_ALL_STARSHIPS_REQUEST = `[${STATE_LABEL}] Get starships request`;
const GET_ALL_STARSHIPS_SUCCESS = `[${STATE_LABEL}] Get starships success`;
const GET_ALL_STARSHIPS_FAILURE = `[${STATE_LABEL}] Get starships failure`;

const getAllRequest = createAction(GET_ALL_STARSHIPS_REQUEST);
const getAllSuccess = createAction(
  GET_ALL_STARSHIPS_SUCCESS,
  props<{ payload: Starship[] }>()
);
const getAllFailure = createAction(GET_ALL_STARSHIPS_FAILURE);

export const types = {
  GET_ALL_STARSHIPS_REQUEST,
  GET_ALL_STARSHIPS_SUCCESS,
  GET_ALL_STARSHIPS_FAILURE,
};

export const actions = {
  getAllRequest,
  getAllSuccess,
  getAllFailure,
};
