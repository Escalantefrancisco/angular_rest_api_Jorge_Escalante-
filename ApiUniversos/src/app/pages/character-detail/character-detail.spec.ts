import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { Character } from '../../models/character';
import { DragonballService } from '../../services/dragonball';
import { CharacterDetailComponent } from './character-detail';

describe('CharacterDetailComponent', () => {
  let component: CharacterDetailComponent;
  let fixture: ComponentFixture<CharacterDetailComponent>;

  const character: Character = {
    id: 1,
    name: 'Goku',
    image: 'https://example.com/goku.png',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: '1' }) } },
        },
        {
          provide: DragonballService,
          useValue: { getCharacterById: () => of(character) },
        },
        { provide: MatSnackBar, useValue: { open: () => undefined } },
        { provide: MatDialog, useValue: { open: () => undefined } },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the character when the request completes', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Goku');
    expect(fixture.nativeElement.textContent).not.toContain('Cargando información');
  });
});
