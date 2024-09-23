import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../service/pokemon.service';
import { PokemonList } from '../../interfaces/PokemonList';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  currentPage: number = 1;
  limit: number = 20;
  totalItems: number = 0;
  offset: number = 0; // Offset para o cálculo de paginação
  isSearching: boolean = false; // Flag para identificar se está em busca

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
    // Verifica se pokemonList e results estão definidos e não estão vazios
    if (!this.pokemonDetails && this.pokemonList && Array.isArray(this.pokemonList.results) && this.pokemonList.results.length > 0) {
      this.fetchPokemonDetails(this.pokemonList.results[0].name); // Usa o primeiro Pokémon por padrão
    }
    this.fetchPokemonPage(this.offset, this.limit); // Inicializa a página com a primeira lista
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

  fetchPokemonPage(offset: number, limit: number): void {
    if (!this.isSearching) {
      this.pokemonService.getPaginatedPokemon(offset, limit).subscribe((response: PokemonList) => {
        this.pokemonList = response;
        this.totalItems = response.count;
      });
    }
  }

  previousPage(): void {
    if (!this.isSearching && this.pokemonList.previous) {
      this.offset -= this.limit;
      this.currentPage--;
      this.fetchPokemonPage(this.offset, this.limit);
    }
  }

  nextPage(): void {
    if (!this.isSearching && this.pokemonList.next) {
      this.offset += this.limit;
      this.currentPage++;
      this.fetchPokemonPage(this.offset, this.limit);
    }
  }

  resetSearch(): void {
    this.isSearching = false; // Sai do modo de busca
    this.fetchPokemonPage(this.offset, this.limit); // Carrega a página atual
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

  imageLoaded = false;  // Controle de carregamento da imagem

  // Método chamado quando a imagem é carregada
  onImageLoad(): void {
    this.imageLoaded = true;
  }
}