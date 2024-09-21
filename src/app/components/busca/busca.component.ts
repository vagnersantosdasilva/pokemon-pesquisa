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
    this.pokemonService.getPokemon(this.searchValue).subscribe(
      result => {
        if (this.searchValue) {
          this.searchResults.emit({ type: 'details', data: result });
        } else {
          this.searchResults.emit({ type: 'list', data: result.results });
        }

      },
      error => {
        console.error('Erro ao buscar Pokémon', error);
      }
    );
  }

}
