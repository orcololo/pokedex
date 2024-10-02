import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from '../../services/pokemon-api.service';
import { Result } from '../../interfaces/pokemon-results';
import { CommonModule } from '@angular/common';
import { debounceTime, Subject } from 'rxjs';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  pokemons: Result[] = [];
  searchInput = '';
  pokemonsFromSearch = new Subject<Result[]>();

  constructor(private pokemonService: PokemonApiService) {}
  searchPokemon(): void {
    const result = this.pokemons.filter((pokemon) => {
      return pokemon.name.includes(this.searchInput.toLowerCase());
    });

    if (this.searchInput.length === 0) {
      this.pokemonService.setSearchRender(false);
    }

    if (result.length <= 20) {
      this.pokemonsFromSearch.next(result);
      this.pokemonService.setSearchRender(true);
    }
  }
  ngOnInit(): void {
    this.pokemonService.allPokemons$.subscribe((res) => {
      this.pokemons = res;
    });
    this.pokemonsFromSearch.pipe(debounceTime(1500)).subscribe((res) => {
      this.pokemonService.setPokemonFromData2(res);
    });
  }
}
