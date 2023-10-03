import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';
import { Starship } from '../models/starship.model';

const PLAYER_ONE_INIT = {
  id: '0',
  name: 'Player 1',
  score: 0,
};

const PLAYER_TWO_INIT = {
  id: '1',
  name: 'Player 2',
  score: 0,
};

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  constructor() {}

  public initializePlayers(starships: Starship[]): Player[] {
    if (starships.length < 1) {
      return [];
    }

    if (starships.length === 1) {
      return [
        { ...PLAYER_ONE_INIT, starship: starships[0] },
        { ...PLAYER_TWO_INIT, starship: starships[0] },
      ];
    }

    return [
      { ...PLAYER_ONE_INIT, starship: starships[0] },
      { ...PLAYER_TWO_INIT, starship: starships[1] },
    ];
  }

  public resolveFight(players: Player[]): Player[][] {
    const winners = players.reduce(
      (prev, curr, index) => {
        if (index < 1) {
          return [...prev];
        }

        const currPower =
          curr.starship.cost_in_credits == 'unknown'
            ? 0
            : BigInt(curr.starship.cost_in_credits);
        const prevPower =
          prev[0].starship.cost_in_credits == 'unknown'
            ? 0
            : BigInt(prev[0].starship.cost_in_credits);

        if (currPower > prevPower) {
          return [curr];
        }

        if (currPower === prevPower) {
          return [...prev, curr];
        }

        return [...prev];
      },
      [players[0]]
    );

    const winnersIds = winners.map((it) => it.id);

    const newPlayers = players.map((it) =>
      winnersIds.includes(it.id) ? { ...it, score: it.score + 1 } : it
    );

    const newWinners = newPlayers.filter((it) => winnersIds.includes(it.id));

    return [newWinners, newPlayers];
  }
}
