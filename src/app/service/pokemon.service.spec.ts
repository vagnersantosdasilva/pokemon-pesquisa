// pokemon.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService],
    });

    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica se não há requisições pendentes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a specific pokemon by name', () => {
    const mockPokemon = { name: 'pikachu', id: 25 };

    service.getPokemon('pikachu').subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu');
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon); // Mocka a resposta com os dados esperados
  });

  it('should fetch paginated pokemon data', () => {
    const mockResponse = { results: [{ name: 'bulbasaur' }, { name: 'ivysaur' }] };

    service.getPaginatedPokemon(0, 20).subscribe((data: any) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Mocka a resposta com os dados esperados
  });
});