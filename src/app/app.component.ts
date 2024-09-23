import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BuscaComponent } from './components/busca/busca.component';
import { CardComponent } from './components/card/card.component';
import { PokemonList } from './interfaces/PokemonList';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,BuscaComponent, CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  pokemonList: PokemonList = {
    count: 0,
    results: [],
    next: '',
    previous: ''
  };
  title = 'pokemon-pesquisa';
   // Declarando as propriedades pokemonList e pokemonDetails
   
  
   pokemonDetails: any = null;
   handleSearchResults(event: any) {
     if (event.type === 'list') {
       this.pokemonList = event.data;
       this.pokemonDetails = null;
     } else if (event.type === 'details') {
       this.pokemonDetails = event.data;
       this.pokemonList.results =[]
     }
   }
}
