import { createAction, props } from '@ngrx/store';
import { Player } from 'src/app/models/player.model';
import { Starship } from 'src/app/models/starship.model';

const STATE_LABEL = 'Match';

const INITIALIZE_PLAYERS = `[${STATE_LABEL}] Initialize players`;
const PLAYERS_INITIALIZED = `[${STATE_LABEL}] Players initialized`;
const CHANGE_PLAYER_STARSHIP = `[${STATE_LABEL}] Change player starship`;
const RESOLVE_FIGHT = `[${STATE_LABEL}] Resolve fight`;
const FIGHT_RESOLVED = `[${STATE_LABEL}] Fight resolved`;

const initializePlayers = createAction(
  INITIALIZE_PLAYERS,
  props<{ starships: Starship[] }>()
);

const playersInitialized = createAction(
  PLAYERS_INITIALIZED,
  props<{ players: Player[] }>()
);

const changePlayerStarship = createAction(
  CHANGE_PLAYER_STARSHIP,
  props<{ player: Player; starship: Starship }>()
);

const resolveFight = createAction(
  RESOLVE_FIGHT,
  props<{ players: Player[] }>()
);

const fightResolved = createAction(
  FIGHT_RESOLVED,
  props<{ payload: { winners: Player[]; players: Player[] } }>()
);

export const types = {
  INITIALIZE_PLAYERS,
  PLAYERS_INITIALIZED,
  CHANGE_PLAYER_STARSHIP,
  RESOLVE_FIGHT,
  FIGHT_RESOLVED,
};

export const actions = {
  initializePlayers,
  playersInitialized,
  changePlayerStarship,
  resolveFight,
  fightResolved,
};
