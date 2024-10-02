import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from '../../services/pokemon-api.service';
import { CommonModule } from '@angular/common';
import { DetailedPokemon } from '../../interfaces/pokemon';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
@Component({
  selector: 'app-pokemon-page-wrapper',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent],
  templateUrl: './pokemon-page-wrapper.component.html',
  styleUrl: './pokemon-page-wrapper.component.scss',
})
export class PokemonPageWrapperComponent implements OnInit {
  pokemons: DetailedPokemon[] = [];
  searchPokemons: DetailedPokemon[] = [];
  searchRender = false;
  constructor(private pokemonService: PokemonApiService) {}
  ngOnInit(): void {
    this.pokemonService.pokemonsWithDetails$.subscribe((res) => {
      this.pokemons = res;
    });
    this.pokemonService.fromSearchPokemons$.subscribe((res) => {
      this.searchPokemons = res;
    });
    this.pokemonService.hasSearchResults$.subscribe((res) => {
      this.searchRender = res;
    });
    this.pokemonService.fetchPokemonList();
    this.pokemonService.fetchAllPokemons();
  }
  loadMore(): void {
    this.pokemonService.fetchPokemonList();
  }
}
