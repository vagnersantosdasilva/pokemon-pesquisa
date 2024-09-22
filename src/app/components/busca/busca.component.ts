import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../service/pokemon.service';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.css'
})
export class BuscaComponent {
  searchValue: string = ''; // Valor de busca no input
  pokemonList: any[] = [];  // Lista de pokémons obtida da API

  @Output() searchResults = new EventEmitter<any>();

  constructor(private pokemonService: PokemonService) { }

  searchPokemon() {
    this.pokemonList = []
    this.pokemonService.getPokemon(this.searchValue).subscribe(
      result => {
        if (this.searchValue) {
          this.pokemonList.push(result);
        }else{
          this.pokemonList = result.results;
        }
        this.searchResults.emit({ type: 'list', data:this.pokemonList });

      },
      error => {
        console.error('Erro ao buscar Pokémon', error);
      }
    );
  }

  ngOnInit() {
    this.loadInitialPokemon();
  }

  loadInitialPokemon() {
    this.pokemonService.getPaginatedPokemon( 0, 20).subscribe(
      (result :any)=> {
        this.pokemonList = result.results;
        this.searchResults.emit({ type: 'list', data: this.pokemonList });
      },
      (error:any) => {
        console.error('Erro ao buscar Pokémon', error);
      }
    );
  }

}
