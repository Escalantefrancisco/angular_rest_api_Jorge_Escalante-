import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon';
import { PokemonDetailComponent } from './pokemon-detail';

describe('PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;

  const pokemon: Pokemon = {
    id: 25,
    name: 'pikachu',
    sprites: {
      front_default: 'pikachu.png',
      other: { 'official-artwork': { front_default: 'pikachu.png' } }
    },
    height: 4,
    weight: 60,
    base_experience: 112,
    types: [{ slot: 1, type: { name: 'electric', url: '' } }],
    abilities: [],
    stats: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDetailComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: '25' }) } }
        },
        { provide: PokemonService, useValue: { getPokemonById: () => of(pokemon) } },
        { provide: MatSnackBar, useValue: { open: () => undefined } },
        { provide: MatDialog, useValue: { open: () => undefined } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the requested Pokémon', () => {
    expect(fixture.nativeElement.textContent).toContain('Pikachu');
    expect(fixture.nativeElement.textContent).toContain('electric');
    expect(fixture.nativeElement.textContent).not.toContain('Cargando información');
  });
});
