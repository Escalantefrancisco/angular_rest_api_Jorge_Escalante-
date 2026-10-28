import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { finalize } from 'rxjs';

import { Character } from '../../models/character';
import { DragonballService } from '../../services/dragonball';
import { ImageDialogComponent } from '../../components/image-dialog/image-dialog';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './character-detail.html',
  styleUrl: './character-detail.scss'
})
export class CharacterDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(DragonballService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  character = signal<Character | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(id) || id < 1) {
      this.loading.set(false);
      this.snackBar.open('Identificador inválido.', 'Cerrar');
      return;
    }

    this.api.getCharacterById(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (character) => {
          this.character.set(character);
        },
        error: () => {
          this.snackBar.open(
            'No se pudo cargar el personaje.',
            'Cerrar',
            { duration: 4000 }
          );
        }
      });
  }

  openImage(): void {
    const character = this.character();
    if (!character) return;

    this.dialog.open(ImageDialogComponent, {
      data: {
        image: character.image,
        name: character.name
      },
      maxWidth: '95vw',
      width: '800px'
    });
  }
}