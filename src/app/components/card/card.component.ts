import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../service/pokemon.service';
import { PokemonList } from '../../interfaces/pokemon.models';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  isSearching: boolean = false; // Flag para identificar se está em busca
  imageLoaded = false;

  @Input() pokemonList: PokemonList = {
    count: 0,
    results: [],
    next: '',
    previous: '',
  };
  @Input() pokemonDetails: any = null;
  @Input() pokemonSelect: any = { name: '', sprites: '', abilities: [], base_experience: '', weight: '', height: '', stats: [] };
  pokemonSelectedList: any[] = [];

  constructor(private pokemonService: PokemonService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

  }

  fetchPokemonDetails(name: string): void {
    this.pokemonService.getPokemon(name)
      .subscribe(response => {
        this.pokemonSelect = response;
        console.log(this.pokemonSelect); // Verifique se a resposta está correta no console
      });
  }

  fetchPokemonSelect(pokemonName: string, index: number): void {

    this.pokemonService.getPokemon(pokemonName).subscribe(data => {
      // Inicializa ou atualiza o estado do Pokémon selecionado
      this.pokemonSelectedList[index] = {
        ...data,
        imageLoaded: this.pokemonSelectedList[index]?.imageLoaded || false
      };
      this.cdr.detectChanges(); // Atualiza o template
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

   // Controle de carregamento da imagem

  // Método chamado quando a imagem é carregada
  onImageLoad(): void {
    this.imageLoaded = true;
  }
}
