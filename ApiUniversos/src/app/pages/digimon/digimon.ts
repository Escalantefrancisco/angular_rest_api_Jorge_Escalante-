
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';

import { Digimon } from '../../models/digimon';
import { DigimonService } from '../../services/digimon';
import { DigimonCardComponent } from '../../components/digimon-card/digimon-card';

@Component({
  selector: 'app-digimon',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    DigimonCardComponent
  ],
  templateUrl: './digimon.html',
  styleUrl: './digimon.scss'
})
export class DigimonComponent implements OnInit {
  private api = inject(DigimonService);
  private snackBar = inject(MatSnackBar);

  digimonList = signal<Digimon[]>([]);
  totalDigimon = signal(0);
  pageSize = 12;
  currentPage = 0;
  loading = signal(false);
  error = signal(false);

  ngOnInit(): void {
    this.loadDigimon();
  }

  loadDigimon(): void {
    this.loading.set(true);
    this.error.set(false);

    this.api.getDigimon(this.currentPage, this.pageSize)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.digimonList.set(response.content);
          this.totalDigimon.set(response.pageable.totalElements);
        },
        error: () => {
          this.error.set(true);
          this.digimonList.set([]);

          this.snackBar.open(
            'No se pudieron cargar los Digimon.',
            'Cerrar',
            { duration: 4000 }
          );
        }
      });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadDigimon();
  }

  retry(): void {
    this.loadDigimon();
  }
}
