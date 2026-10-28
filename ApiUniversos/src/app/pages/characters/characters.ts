import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';

import { Character } from '../../models/character';
import { DragonballService } from '../../services/dragonball';
import { CharacterCardComponent } from '../../components/character-card/character-card';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    CharacterCardComponent
  ],
  templateUrl: './characters.html',
  styleUrl: './characters.scss'
})
export class CharactersComponent implements OnInit {
  private api = inject(DragonballService);
  private snackBar = inject(MatSnackBar);

  characters = signal<Character[]>([]);

  totalCharacters = signal(0);
  pageSize = 12;
  currentPage = 0;
  loading = signal(false);
  error = signal(false);

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.loading.set(true);
    this.error.set(false);

    this.api.getCharacters(
      this.currentPage + 1,
      this.pageSize
    )
    .pipe(finalize(() => this.loading.set(false)))
    .subscribe({
      next: (response) => {
        this.characters.set(response.items);
        this.totalCharacters.set(response.meta.totalItems);
      },
      error: () => {
        this.error.set(true);
        this.characters.set([]);

        this.snackBar.open(
          'No se pudieron cargar los personajes.',
          'Cerrar',
          { duration: 4000 }
        );
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCharacters();
  }

  retry(): void {
    this.loadCharacters();
  }
}
