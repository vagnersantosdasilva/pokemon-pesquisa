export interface PokemonList {
  count: number;
  results: Array<Pokemon>;
  next?: string | null;
  previous?: string | null;
}

export interface Pokemon {
  id?: number;
  name: string;
  url?: string;
}

export interface cries {
  lagest?: string;
  legacy?: string;
};

export interface PokemonDetails extends Pokemon {
  height?: number;
  weight?: number;
  types?: Array<{ slot: number; type: { name: string; url: string } }>;
  abilities?: Array<{ ability: { name: string; url: string }; is_hidden: boolean; slot: number }>;
  stats?: Array<{ base_stat: number; effort: number; stat: { name: string; url: string } }>;
  species?: { name: string; url: string };
  game_indices?: Array<{ game_index: number; version: { name: string; url: string } }>;
  cries?: cries;
  sprites?: {
    front_default?: string;
    front_default_female?: string;
    back_default?: string;
    back_default_female?: string;
    front_shiny?: string;
    front_shiny_female?: string;
    back_shiny?: string;
    back_shiny_female?: string;
  };
  forms?: Array<Pokemon>;
}

