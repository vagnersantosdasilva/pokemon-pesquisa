import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../service/pokemon.service';
import { PokemonList} from '../../interfaces/PokemonList';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.css'
})
export class BuscaComponent {
  searchValue: string = ''; // Valor de busca no input


  pokemonList: PokemonList = {
    count: 0,
    results: [],
    next: "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",
    previous: ''
  };  // Lista de pokémons obtida da API

  @Output() searchResults = new EventEmitter<any>();

  constructor(private pokemonService: PokemonService) { }
  

  searchPokemon() {

    this.pokemonList = this.resetPokemonList()
    this.pokemonService.getPokemon(this.searchValue).subscribe(
      result => {
        if (this.searchValue) {
          if (result && result.name)
          this.pokemonList.results.push({name:result.name, url:''});
        } else {
          this.pokemonList = { ...result };
        }
        this.searchResults.emit({ type: 'list',data: this.pokemonList });

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

  resetPokemonList(){
    return  {
      count: 0,
      results: [],
      next: "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",
      previous: ''
    };  
  }

}
