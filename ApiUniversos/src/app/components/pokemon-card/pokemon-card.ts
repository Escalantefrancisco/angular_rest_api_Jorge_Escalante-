
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TitleCasePipe } from '@angular/common';

import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, TitleCasePipe],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.scss'
})
export class PokemonCardComponent {
  @Input({ required: true }) pokemon!: Pokemon;

  get imageUrl(): string {
    return this.pokemon.sprites.other?.['official-artwork']?.front_default
      || this.pokemon.sprites.front_default
      || '';
  }
}
