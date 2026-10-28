import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ImageDialogComponent } from './image-dialog';

describe('ImageDialogComponent', () => {
  let component: ImageDialogComponent;
  let fixture: ComponentFixture<ImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageDialogComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { image: 'https://example.com/goku.png', name: 'Goku' },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
