import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { PokemonPageWrapperComponent } from '../../components/pokemon-page-wrapper/pokemon-page-wrapper.component';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-pokemon-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    PokemonPageWrapperComponent,
    PokemonCardComponent,
  ],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.scss',
})
export class PokemonPageComponent {}
