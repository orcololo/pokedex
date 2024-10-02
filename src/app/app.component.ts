import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonPageComponent } from './pages/pokemon-page/pokemon-page.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PokemonPageComponent,
    HeaderComponent,
    AngularFireModule,
    AngularFireAuthModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pokeangular';
}
