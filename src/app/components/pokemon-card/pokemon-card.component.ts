import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DetailedPokemon } from '../../interfaces/pokemon';
import { CommonModule } from '@angular/common';
import { colorMapper, generateBoxShadow } from '../../utils/color-mapper';
import { PokemonNumberPipe } from '../../pipes/pokemon-number.pipe';
import { DetailsOverlayComponent } from '../../components/details-overlay/details-overlay.component';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { PokemonApiService } from '../../services/pokemon-api.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [
    CommonModule,
    PokemonNumberPipe,
    DetailsOverlayComponent,
    PortalModule,
    OverlayModule,
  ],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent implements OnInit {
  @ViewChild(DetailsOverlayComponent) detailsOverlay!: DetailsOverlayComponent;
  @Input() pokemonName!: string;
  pokemon?: DetailedPokemon;
  pokemonTypes: string[] = [];
  colorMapper = colorMapper;
  generateBoxShadow = generateBoxShadow;
  shiny = false;
  imageSrc = '';
  buttonText = '';

  constructor(
    private pokemonService: PokemonApiService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.pokemonService.pokemonsWithDetails$.subscribe((res) => {
      const pokemon = res.find((pokemon) => pokemon.name === this.pokemonName);
      this.pokemon = pokemon;
      this.imageSrc = this.getImageOrPlaceholder();
      this.generateStatsArray();
      this.generateTypes();
    });
  }

  getImageOrPlaceholder() {
    return this.pokemon?.sprites.front_default
      ? this.pokemon.sprites.front_default
      : '/unknown.webp';
  }
  generateStatsArray() {
    if (!this.pokemon) {
      return [];
    }
    return this.pokemon.stats.map((stat) => {
      return {
        name: stat.stat.name.split('-').join(' '),
        base_stat: stat.base_stat,
      };
    });
  }

  generateTypes() {
    if (!this.pokemon) {
      this.pokemonTypes = [];
    } else {
      this.pokemonTypes = this.pokemon.types.map((type) => type.type.name);
    }
  }

  handleShinyClick(): void {
    if (!this.pokemon?.sprites.front_default) {
      this.imageSrc =
        'https://static.wikia.nocookie.net/bec6f033-936d-48c5-9c1e-7fb7207e28af/scale-to-width/755';
    }
    if (this.shiny) {
      this.imageSrc = this.pokemon!.sprites.front_default;
      this.shiny = false;
    } else {
      this.imageSrc = this.pokemon!.sprites.front_shiny;
      this.shiny = true;
    }
  }

  openModal() {
    this.modalService.setPokemon(this.pokemon!);
    this.detailsOverlay.openModal();
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
