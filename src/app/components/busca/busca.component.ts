import { Component } from '@angular/core';




@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.css'
})
export class BuscaComponent {
  searchValue: string = ''; // Valor de busca no input
  pokemonList: any[] = [];  // Lista de pokémons obtida da API

  searchPokemon(){}
}
