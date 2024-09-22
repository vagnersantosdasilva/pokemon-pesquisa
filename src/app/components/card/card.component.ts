import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../service/pokemon.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  constructor(private pokemonService: PokemonService,private cdr: ChangeDetectorRef) { }

  @Input() pokemonList: any[] = [];
  @Input() pokemonDetails: any = null;
  @Input() pokemonSelect: any = null;
  pokemonSelectedList: any[] = [];

  // ngOnInit(): void {
  //   // Optional: If fetchPokemonDetails is called before data is received
  //   if (!this.pokemonDetails) {
  //     this.fetchPokemonDetails(this.pokemonList[0].name); // Use the first Pokemon by default
  //   }
  // }

  fetchPokemonDetails(name: string) {
    this.pokemonService.getPokemon(name)
      .subscribe(response => {
        this.pokemonSelect = response;
        console.log(this.pokemonSelect); // Verifique se a resposta está correta no console
        // this.pokemonDetails = response;
      });
  }

  fetchPokemonSelect(pokemonName: string, index: number) {
    this.pokemonService.getPokemon(pokemonName).subscribe((data) => {
      this.pokemonSelect = data;
      this.pokemonSelectedList[index] = { ...data, imageLoaded: false }; // Reiniciar estado da imagem
      this.cdr.detectChanges(); // Forçar a atualização do template
    });
  }

  onImageSelectedLoad(index: number) {
    if (this.pokemonSelectedList[index]) {
      this.pokemonSelectedList[index].imageLoaded = true;
    }
  }


  imageLoaded = false;  // Controle de carregamento da imagem

  //Método chamado quando a imagem é carregada
  onImageLoad() {
    this.imageLoaded = true;
  }
}