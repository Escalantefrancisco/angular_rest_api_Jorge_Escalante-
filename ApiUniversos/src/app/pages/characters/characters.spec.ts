import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { Character } from '../../models/character';
import { DragonballService } from '../../services/dragonball';
import { CharactersComponent } from './characters';

describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;
  const character: Character = {
    id: 1,
    name: 'Goku',
    image: 'https://example.com/goku.png',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersComponent],
      providers: [
        provideRouter([]),
        {
          provide: DragonballService,
          useValue: {
            getCharacters: () =>
              of({
                items: [character],
                meta: {
                  totalItems: 1,
                  itemCount: 1,
                  itemsPerPage: 12,
                  totalPages: 0,
                  currentPage: 1,
                },
                links: { first: '', previous: '', next: '', last: '' },
              }),
          },
        },
        { provide: MatSnackBar, useValue: { open: () => undefined } },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display characters when the request completes', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Goku');
    expect(fixture.nativeElement.textContent).not.toContain('Cargando personajes');
  });
});
