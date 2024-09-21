import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient)
 {}

  getPokemon(name: string) {
    const result = this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${name}`);
    console.log(result);
    return result;
  }
}
