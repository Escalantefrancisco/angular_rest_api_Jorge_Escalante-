import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { Pokemon as PokemonModel } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon';
import { PokemonComponent } from './pokemon';

describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;

  const pokemon: PokemonModel = {
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
      imports: [PokemonComponent],
      providers: [
        provideRouter([]),
        {
          provide: PokemonService,
          useValue: { getPokemons: () => of({ count: 1, items: [pokemon] }) }
        },
        { provide: MatSnackBar, useValue: { open: () => undefined } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the Pokémon returned by the service', () => {
    expect(fixture.nativeElement.textContent).toContain('Pikachu');
    expect(fixture.nativeElement.textContent).toContain('Total de Pokémon registrados: 1');
    expect(fixture.nativeElement.textContent).not.toContain('Cargando Pokémon');
  });
});
