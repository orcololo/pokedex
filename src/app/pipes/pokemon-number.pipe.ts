import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonNumber',
  standalone: true,
})
export class PokemonNumberPipe implements PipeTransform {
  transform(value: number): string {
    if (typeof value !== 'number') {
      return '';
    }
    const stringValue = value.toString().padStart(4, '0');
    return stringValue;
  }
}
