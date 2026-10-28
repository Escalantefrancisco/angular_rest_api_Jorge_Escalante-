import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface ImageDialogData {
  image: string;
  name: string;
}

@Component({
  selector: 'app-image-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './image-dialog.html',
  styleUrl: './image-dialog.scss'
})
export class ImageDialogComponent {
  data = inject<ImageDialogData>(MAT_DIALOG_DATA);
}