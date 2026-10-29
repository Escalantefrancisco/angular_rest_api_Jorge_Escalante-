
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

import { Digimon } from '../../models/digimon';
import { DigimonService } from '../../services/digimon';
import { ImageDialogComponent } from '../../components/image-dialog/image-dialog';

@Component({
  selector: 'app-digimon-detail',
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
  templateUrl: './digimon-detail.html',
  styleUrl: './digimon-detail.scss'
})
export class DigimonDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(DigimonService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  digimon = signal<Digimon | null>(null);
  loading = signal(true);
  error = signal(false);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(id) || id < 1) {
      this.loading.set(false);
      this.error.set(true);
      return;
    }

    this.api.getDigimonById(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => {
          this.digimon.set(data);
        },
        error: () => {
          this.error.set(true);
          this.snackBar.open(
            'No se pudo cargar la información del Digimon.',
            'Cerrar',
            { duration: 4000 }
          );
        }
      });
  }

  openImage(): void {
    const digimon = this.digimon();
    if (!digimon) return;

    this.dialog.open(ImageDialogComponent, {
      data: {
        image: digimon.image,
        name: digimon.name
      },
      width: '800px',
      maxWidth: '95vw'
    });
  }
}
