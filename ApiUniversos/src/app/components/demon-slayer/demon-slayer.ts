import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';

import { DemonSlayerService } from '../../services/demon-slayer';
import { DemonSlayerCharacter } from '../../models/demon-slayer-character';
import { DemonSlayerCardComponent } from '../demon-slayer-card/demon-slayer-card';

@Component({
  selector: 'app-demon-slayer',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    DemonSlayerCardComponent
  ],
  templateUrl: './demon-slayer.html',
  styleUrl: './demon-slayer.scss'
})
export class DemonSlayerComponent implements OnInit {

  private service = inject(DemonSlayerService);
  private snackBar = inject(MatSnackBar);

  characters = signal<DemonSlayerCharacter[]>([]);

  loading = signal(true);

  pageIndex = signal(0);
  pageSize = signal(12);

  totalCharacters = signal(0);
  error = signal(false);

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {

    this.loading.set(true);
    this.error.set(false);

    const apiPage = this.pageIndex() + 1;

    this.service.getCharacters(apiPage, this.pageSize())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => {
          this.characters.set(data.content);
          this.totalCharacters.set(data.pagination.totalElements);
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

  changePage(event: PageEvent): void {

    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);

    this.loadCharacters();

  }

  retry(): void {
    this.loadCharacters();
  }

}