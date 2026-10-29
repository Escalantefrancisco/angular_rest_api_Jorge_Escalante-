
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { finalize } from 'rxjs';

import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon';
import { ImageDialogComponent } from '../../components/image-dialog/image-dialog';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    RouterLink,
    TitleCasePipe,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.scss'
})
export class PokemonDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(PokemonService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  pokemon = signal<Pokemon | null>(null);
  loading = signal(true);
  error = signal(false);

  get imageUrl(): string {
    const pokemon = this.pokemon();
    if (!pokemon) return '';

    return pokemon.sprites.other?.['official-artwork']?.front_default
      || pokemon.sprites.front_default
      || '';
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(id) || id < 1) {
      this.loading.set(false);
      this.error.set(true);
      return;
    }

    this.api.getPokemonById(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => this.pokemon.set(data),
        error: () => {
          this.error.set(true);
          this.snackBar.open(
            'No se pudo cargar el Pokémon.',
            'Cerrar',
            { duration: 4000 }
          );
        }
      });
  }

  openImage(): void {
    const pokemon = this.pokemon();
    if (!pokemon || !this.imageUrl) return;

    this.dialog.open(ImageDialogComponent, {
      data: {
        image: this.imageUrl,
        name: pokemon.name
      },
      width: '800px',
      maxWidth: '95vw'
    });
  }
}
