import { createReducer, on } from '@ngrx/store';
import { MatchState } from './match.selectors';
import { actions } from './match.actions';

export const initialState: MatchState = {
  number: 1,
  players: [],
};

export const matchReducer = createReducer(
  initialState,
  on(actions.playersInitialized, (state, action) => {
    const { players } = action;

    return {
      ...state,
      players: [...players],
    };
  }),
  on(actions.changePlayerStarship, (state, action) => {
    const { player, starship } = action;
    const { players } = state;

    const playerToModify = players.find((it) => it.id === player.id);

    if (!playerToModify) {
      return { ...state };
    }

    const newPlayer = { ...playerToModify, starship };

    const newPlayers = players.map((it) =>
      it.id === playerToModify.id ? newPlayer : it
    );

    return {
      ...state,
      players: [...newPlayers],
    };
  }),
  on(actions.fightResolved, (state, action) => {
    const { number } = state;
    const { players } = action.payload;

    return {
      ...state,
      number: number + 1,
      players: [...players],
    };
  })
);
