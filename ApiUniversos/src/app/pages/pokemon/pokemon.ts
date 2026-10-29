
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';

import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    PokemonCardComponent
  ],
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.scss'
})
export class PokemonComponent implements OnInit {
  private api = inject(PokemonService);
  private snackBar = inject(MatSnackBar);

  pokemons = signal<Pokemon[]>([]);
  totalPokemons = signal(0);
  pageSize = 12;
  currentPage = 0;
  loading = signal(false);
  error = signal(false);

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.loading.set(true);
    this.error.set(false);

    this.api.getPokemons(this.currentPage, this.pageSize)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.pokemons.set(response.items);
          this.totalPokemons.set(response.count);
        },
        error: () => {
          this.error.set(true);
          this.pokemons.set([]);

          this.snackBar.open(
            'No se pudieron cargar los Pokémon.',
            'Cerrar',
            { duration: 4000 }
          );
        }
      });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPokemons();
  }

  retry(): void {
    this.loadPokemons();
  }
}
