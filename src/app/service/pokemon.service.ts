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

  getPaginatedPokemon(offset: number, limit: number): any {
    const url = `${this.baseUrl}pokemon/?offset=${offset}&limit=${limit}`;
    return this.http.get<any>(url);
  }
}


/*  Preciso implementar um controle de paginação
{
    "count": 1302,
    "next": "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",
    "previous": null,
    "results": [ ] 
}
*/