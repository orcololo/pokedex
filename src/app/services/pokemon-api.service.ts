import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonResults, Result } from '../interfaces/pokemon-results';
import {
  BehaviorSubject,
  catchError,
  from,
  map,
  mergeMap,
  Observable,
  take,
  tap,
  toArray,
} from 'rxjs';
import { DetailedPokemon, Pokemon } from '../interfaces/pokemon';
import { SpeciesInfo } from '../interfaces/species-info';

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  private pokemonsWithDetails: BehaviorSubject<DetailedPokemon[]> =
    new BehaviorSubject<DetailedPokemon[]>([]);
  private allPokemons: BehaviorSubject<Result[]> = new BehaviorSubject<
    Result[]
  >([]);
  private fromSearchPokemons: BehaviorSubject<DetailedPokemon[]> =
    new BehaviorSubject<DetailedPokemon[]>([]);
  private offset = 0;
  private limit = 20;
  private results: PokemonResults = {
    count: 0,
    next: '',
    previous: '',
    results: [],
  };
  private hasSearchResults: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  allPokemons$ = this.allPokemons.asObservable();
  pokemonsWithDetails$ = this.pokemonsWithDetails.asObservable();
  hasSearchResults$ = this.hasSearchResults.asObservable();
  fromSearchPokemons$ = this.fromSearchPokemons.asObservable();

  baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private httpClient: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `PokeApi returned code ${error.status}, body was:`,
        error.error
      );
    }
    return [];
  }

  fetchPokemonList(): void {
    if (this.offset == 0) {
      this.httpClient
        .get<PokemonResults>(
          `${this.baseUrl}/pokemon?offset=${this.offset}&limit=${this.limit}`
        )
        .pipe(
          tap((res) => {
            this.results = res;
            this.offset += this.limit;
          })
        )
        .pipe(catchError(this.handleError))
        .subscribe();
    } else {
      this.httpClient
        .get<PokemonResults>(
          `${this.baseUrl}/pokemon?offset=${this.offset}&limit=${this.limit}`
        )
        .pipe(
          tap((res) => {
            this.results = res;
            this.offset += this.limit;
          })
        )
        .pipe(catchError(this.handleError))
        .subscribe();
    }
  }

  getPokemonsWithDetailsList(): DetailedPokemon[] {
    return this.pokemonsWithDetails.value;
  }

  setPokemonWithDetails(pokemons: DetailedPokemon[]): void {
    this.pokemonsWithDetails.next(pokemons);
  }

  setSearchRender(bool: boolean): void {
    this.hasSearchResults.next(bool);
  }

  setPokemonFromData2(pokemons: Result[]) {
    from(pokemons)
      .pipe(
        mergeMap((pokemon) => {
          return this.fetchPokemonData(pokemon.name).pipe(
            mergeMap((pokemonData) => {
              return this.fetchPokemonSpeciesData(
                pokemonData.species.name
              ).pipe(
                map((speciesData) => {
                  return { ...speciesData, ...pokemonData };
                })
              );
            }),
            catchError((error) => {
              throw error;
            })
          );
        }),
        catchError((error) => {
          throw error;
        }),
        toArray()
      )
      .subscribe({
        next: (combinedDataArray) => {
          const pokemonInfoFromService = this.getPokemonsWithDetailsList();
          pokemonInfoFromService.push(...combinedDataArray);
          this.setPokemonWithDetails(pokemonInfoFromService);
          this.fromSearchPokemons.next(combinedDataArray);
        },
        error: (error) => {
          console.error('Error in subscribe:', error);
        },
      });
  }

  fetchPokemonData(name: string): Observable<Pokemon> {
    return this.httpClient
      .get<Pokemon>(`${this.baseUrl}/pokemon/${name}`)
      .pipe(catchError(this.handleError));
  }

  fetchAllPokemons(): void {
    this.httpClient
      .get<PokemonResults>(`${this.baseUrl}/pokemon?limit=1302}`)
      .pipe(take(1))
      .subscribe((res) => {
        this.allPokemons.next(res.results);
      });
  }

  fetchPokemonSpeciesData(name: string): Observable<SpeciesInfo> {
    return this.httpClient
      .get<SpeciesInfo>(`${this.baseUrl}/pokemon-species/${name}`)
      .pipe(catchError(this.handleError));
  }
}
