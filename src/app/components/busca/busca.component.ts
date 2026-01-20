import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../service/pokemon.service';
import { PokemonList } from '../../models/pokemon.models';
import { PAGINATION_CONFIG } from '../../shared/constants/pagination.constants';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.css'
})
export class BuscaComponent {
  public searchValue: string = ''; // Valor de busca no input
  private pokemonService = inject(PokemonService);
  private pokemonList: PokemonList = {
    count: 0,
    results: [],
    next: null,
    previous: null,
  };
  public limit = PAGINATION_CONFIG.DEFAULT_LIMIT;
  public offset = PAGINATION_CONFIG.DEFAULT_OFFSET;

  @Output() searchResults = new EventEmitter<PokemonList>();

  public searchPokemon(): void {
    this.pokemonList = this.resetPokemonList()
    this.pokemonService.getPokemon(this.searchValue).subscribe({
      next: (pokemon) => {
        if (pokemon.name) {
          this.pokemonList.results.push(pokemon);
          this.pokemonList.count = 1;
          this.pokemonList.previous = null;
          this.pokemonList.next = null;
          this.searchResults.emit(this.pokemonList);
        }
        else {
          this.loadInitialPokemon();
        }
      },
      error: (error) => {
        console.error('Erro ao buscar Pokémon', error);
      },
    });
  }

  private loadInitialPokemon(): void {
    this.pokemonService.getPaginatedPokemon(this.offset, this.limit).subscribe(
      {
        next: (data) => {
          this.pokemonList = data;
          this.searchResults.emit(this.pokemonList);
        },

        error: (error) => {
          console.error('Erro ao carregar lista inicial de Pokémons', error);
        },
      }

    );
  }
  private resetPokemonList() : PokemonList {
    return {
      count: 0,
      results: [],
      next: null,
      previous: null
    };
  }

}
