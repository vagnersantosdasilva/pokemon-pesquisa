import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../service/pokemon.service';
import { PokemonDetails, PokemonList, PokemonSelectable } from '../../models/pokemon.models';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent  {

  public isSearching: boolean = false; // Flag para identificar se está em busca
  public pokemonSelectedList: PokemonSelectable[] = [];
  public pokemonSelect: PokemonDetails = {
    name: '',
    sprites: {},
    types: [], forms: [], id: 0, url: '', game_indices: [],
    abilities: [], stats: [],
    cries: {},
    height: 0, weight: 0,
    base_experience: 0,
  };
  private pokemonService = inject(PokemonService)

  @Input() pokemonList: PokemonList = {
    count: 0,
    results: [],
    next: '',
    previous: '',
  };


  public fetchPokemonDetails(name: string): void {
    this.pokemonService.getPokemon(name)
      .subscribe(response => {
        this.pokemonSelect = response;
        console.log(this.pokemonSelect); // Verifique se a resposta está correta no console
      });
  }

  public fetchPokemonSelect(pokemonName: string, index: number): void {

    this.pokemonService.getPokemon(pokemonName).subscribe(data => {
      // Inicializa ou atualiza o estado do Pokémon selecionado
      this.pokemonSelectedList[index] = {
        ...data,
        imageLoaded: this.pokemonSelectedList[index]?.imageLoaded || false
      };
      // Atualiza o template
      this.openModal(); // Abre o modal
    });
  }

  openModal(): void {
    setTimeout(() => {
      const modalTrigger = document.querySelector('#pokemonModal') as HTMLElement;
      if (modalTrigger) {
        modalTrigger.click(); // Simula o clique no modal para abri-lo
      }
    }, 100); // Pequeno atraso para sincronização
  }

  onImageSelectedLoad(index: number): void {
    if (this.pokemonSelectedList[index]) {
      this.pokemonSelectedList[index].imageLoaded = true;
    }
  }
}
