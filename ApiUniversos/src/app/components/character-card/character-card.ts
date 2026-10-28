import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { Character } from '../../models/character';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './character-card.html',
  styleUrl: './character-card.scss'
})
export class CharacterCardComponent {
  @Input({ required: true }) character!: Character;
}