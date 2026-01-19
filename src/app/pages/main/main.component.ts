import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PageComponent } from "../../shared/components/page/page.component";
import { PokemonDetails, PokemonList } from '../../interfaces/pokemon.models';
import { BuscaComponent } from "../../components/busca/busca.component";
import { CardComponent } from "../../components/card/card.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { PaginateControlComponent } from "../../shared/components/paginate-control/paginate-control.component";
import { PokemonService } from '../../service/pokemon.service';
import { PAGINATION_CONFIG } from '../../shared/constants/pagination.constants';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [PageComponent, BuscaComponent, CardComponent, FooterComponent, PaginateControlComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{

  public currentPage: number = PAGINATION_CONFIG.INITIAL_PAGE;
  public limit: number = PAGINATION_CONFIG.DEFAULT_LIMIT;
  public offset: number = PAGINATION_CONFIG.DEFAULT_OFFSET; // Offset para o cálculo de paginação
  public isSearching: boolean = false; // Flag para identificar se está em busca

  public pokemonList: PokemonList = {
    count: 0,
    results: [],
    next: '',
    previous: ''
  };

  public pokemonDetails: PokemonDetails = { height: 0, weight: 0, name: '' , sprites: {}};

  private pokemonService = inject(PokemonService);

  ngOnInit(): void {
    this.fetchPokemonPage(this.offset, this.limit);
  }

  public handleSearchResults(event: PokemonList) :void{
      this.limit = PAGINATION_CONFIG.DEFAULT_LIMIT;
      this.offset = PAGINATION_CONFIG.DEFAULT_OFFSET;
      this.currentPage = PAGINATION_CONFIG.INITIAL_PAGE;
      this.pokemonList = event;
      this.pokemonDetails = { height: 0, weight: 0, name: '' , sprites: {}};
  }


  previousPage(): void {
    console.log('Previous page clicked. Previous available:', this.pokemonList.previous);
    console.log('Valores atuais - Offset:', this.offset, 'Limit:', this.limit, 'CurrentPage:', this.currentPage);
    if (!this.isSearching && this.pokemonList.previous) {
      this.offset -= this.limit;
      this.currentPage--;
      this.fetchPokemonPage(this.offset, this.limit);
    }
  }

  nextPage(): void {
    console.log('Next page clicked. Next available:', this.pokemonList.next);
    console.log('Valores atuais - Offset:', this.offset, 'Limit:', this.limit, 'CurrentPage:', this.currentPage);
    if (!this.isSearching && this.pokemonList.next) {
      this.offset += this.limit;
      this.currentPage++;
      console.log('Valores atuais - Offset:', this.offset, 'Limit:', this.limit, 'CurrentPage:', this.currentPage);
      this.fetchPokemonPage(this.offset, this.limit);

    }
  }

  resetSearch(): void {
    this.isSearching = false; // Sai do modo de busca
    this.fetchPokemonPage(this.offset, this.limit); // Carrega a página atual
  }

  fetchPokemonPage(offset: number, limit: number): void {
    if (!this.isSearching) {
      this.pokemonService.getPaginatedPokemon(offset, limit)
      .subscribe({
        next: (response) => {
          this.pokemonList = response;
        },
        error: (error) => {
          console.error('Erro ao buscar Pokémon', error);
        },
      });
    }
  }

}
