export interface PokemonList {
    count: number;
    results: Array<{ name: string; url: string }>;
    next: string;
    previous: string;
  }