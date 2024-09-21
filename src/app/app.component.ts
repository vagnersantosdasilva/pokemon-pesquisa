import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BuscaComponent } from './components/busca/busca.component';
import { CardComponent } from './components/card/card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,BuscaComponent, CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pokemon-pesquisa';
   // Declarando as propriedades pokemonList e pokemonDetails
   pokemonList: any[] = [];
  
   pokemonDetails: any = null;
   handleSearchResults(event: any) {
     if (event.type === 'list') {
       this.pokemonList = event.data;
       this.pokemonDetails = null;
     } else if (event.type === 'details') {
       this.pokemonDetails = event.data;
       this.pokemonList = [];
     }
   }
}
