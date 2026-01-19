import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { PokemonDetails, PokemonList } from '../interfaces/pokemon.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);


  public getPokemon(name: string) : Observable<PokemonDetails> {
    const result = this.http.get<PokemonDetails>(`${this.baseUrl}pokemon/${name}`);
    console.log('retorno padrão:',result);
    return result;
  }

  public getPaginatedPokemon(offset: number, limit: number): Observable<PokemonList> {
    const url = `${this.baseUrl}pokemon/?offset=${offset}&limit=${limit}`;
    return this.http.get<PokemonList>(url);
  }
}
