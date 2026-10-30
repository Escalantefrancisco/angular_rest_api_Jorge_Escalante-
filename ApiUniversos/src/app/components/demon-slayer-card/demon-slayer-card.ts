import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { DemonSlayerCharacter } from '../../models/demon-slayer-character';

@Component({
  selector: 'app-demon-slayer-card',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './demon-slayer-card.html',
  styleUrl: './demon-slayer-card.scss'
})
export class DemonSlayerCardComponent {

  @Input({ required: true })
  character!: DemonSlayerCharacter;

}