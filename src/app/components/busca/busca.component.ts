import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../service/pokemon.service';
import { PokemonList } from '../../interfaces/pokemon.models';
//import { PokemonList} from '../../interfaces/PokemonList';


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
    next: "https://pokeapi.co/api/v2/pokemon/?offset=10&limit=60",
    previous: ''
  };  // Lista de pokémons obtida da API

  @Output() searchResults = new EventEmitter<any>();




  public searchPokemon(): void {
    this.pokemonList = this.resetPokemonList()
    this.pokemonService.getPokemon(this.searchValue).subscribe({
      next: (pokemon) => {
        if (pokemon.name) {
          this.pokemonList.results.push(pokemon);
          this.pokemonList.next = null;
          this.searchResults.emit({ type: 'list', data: this.pokemonList });
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

  ngOnInit() {
    this.loadInitialPokemon();
  }

  private loadInitialPokemon(): void {
    this.pokemonService.getPaginatedPokemon(0, 20).subscribe(
      (result: any) => {
        this.pokemonList = result;
        this.searchResults.emit({ type: 'list', data: this.pokemonList });
        console.log('inicial :', this.pokemonList)
      },
      (error: any) => {
        console.error('Erro ao buscar Pokémon', error);
      }
    );
  }

  resetPokemonList() {
    return {
      count: 0,
      results: [],
      next: "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",
      previous: ''
    };
  }

}
