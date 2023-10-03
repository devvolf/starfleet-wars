import { Starship } from './starship.model';

export type Player = {
  id: string;
  name: string;
  score: number;
  starship: Starship;
};
