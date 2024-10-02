import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, from, map, mergeMap, tap, toArray } from 'rxjs';
import { PokemonApiService } from '../services/pokemon-api.service';
import { PokemonResults } from '../interfaces/pokemon-results';

export const pokemonEnrichmentFnInterceptor: HttpInterceptorFn = (
  req,
  next
) => {
  const pokemonApiService = inject(PokemonApiService);
  return next(req).pipe(
    tap((res) => {
      if (res instanceof HttpResponse && res.url?.includes('limit=20')) {
        const pokemon = res.body as PokemonResults;
        from(pokemon.results)
          .pipe(
            mergeMap((pokemon) => {
              return pokemonApiService.fetchPokemonData(pokemon.name).pipe(
                mergeMap((pokemonData) => {
                  return pokemonApiService
                    .fetchPokemonSpeciesData(pokemonData.species.name)
                    .pipe(
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
              const pokemonInfoFromService =
                pokemonApiService.getPokemonsWithDetailsList();
              pokemonInfoFromService.push(...combinedDataArray);
              pokemonApiService.setPokemonWithDetails(pokemonInfoFromService);
            },
            error: (error) => {
              console.error('Error in subscribe:', error);
            },
          });
      }
    })
  );
};
