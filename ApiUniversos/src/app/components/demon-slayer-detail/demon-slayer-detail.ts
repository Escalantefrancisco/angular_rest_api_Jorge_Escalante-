import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';

import { DemonSlayerService } from '../../services/demon-slayer';
import { DemonSlayerCharacter } from '../../models/demon-slayer-character';
import { ImageDialogComponent } from '../image-dialog/image-dialog';

@Component({
  selector: 'app-demon-slayer-detail',
  standalone: true,
  imports: [
    RouterLink,
    MatDialogModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  templateUrl: './demon-slayer-detail.html',
  styleUrl: './demon-slayer-detail.scss'
})
export class DemonSlayerDetailComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private service = inject(DemonSlayerService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  character = signal<DemonSlayerCharacter | null>(null);

  loading = signal(true);

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(id) || id <= 0) {
      this.loading.set(false);
      this.snackBar.open('Identificador inválido.', 'Cerrar');
      return;
    }

    this.service.getCharacterById(id)
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
        image: character.img,
        name: character.name
      },

      maxWidth: '95vw',
      width: '800px'

    });

  }

}