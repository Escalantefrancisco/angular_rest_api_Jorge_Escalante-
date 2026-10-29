
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { Digimon } from '../../models/digimon';

@Component({
  selector: 'app-digimon-card',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './digimon-card.html',
  styleUrl: './digimon-card.scss'
})
export class DigimonCardComponent {
  @Input({ required: true }) digimon!: Digimon;
}
