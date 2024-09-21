import { Component, Input } from '@angular/core';
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

  constructor(private pokemonService: PokemonService) { }

  @Input() pokemonList: any[] = [];
  @Input() pokemonDetails: any = null;

  ngOnInit(): void {
    // Optional: If fetchPokemonDetails is called before data is received
    if (!this.pokemonDetails) {
      this.fetchPokemonDetails(this.pokemonList[0].name); // Use the first Pokemon by default
    }
  }

  fetchPokemonDetails(name: string) {
    this.pokemonService.getPokemon(name)
      .subscribe(response => {
        const { sprites, name, types } = response; // Destructuring for clarity
        const pokemonDetails = {
          sprite: sprites.front_default, // Extract front sprite
          name,
          type: types[0].type.name // Assuming primary type
        };
        this.pokemonDetails = pokemonDetails;
        console.log(pokemonDetails);
      });
  }

  imageLoaded = false;  // Controle de carregamento da imagem

  // Método chamado quando a imagem é carregada
  onImageLoad() {
    this.imageLoaded = true;
  }
}