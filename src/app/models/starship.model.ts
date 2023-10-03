export type Starship = {
  name: string;
  model: string;
  starship_class: string;
  cost_in_credits: number | 'unknown';
};

export type StarshipPageItem = {
  uid: number;
  name: string;
  url: string;
};
