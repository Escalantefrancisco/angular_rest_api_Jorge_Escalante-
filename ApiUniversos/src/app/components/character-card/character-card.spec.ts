import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Character } from '../../models/character';
import { CharacterCardComponent } from './character-card';

describe('CharacterCardComponent', () => {
  let component: CharacterCardComponent;
  let fixture: ComponentFixture<CharacterCardComponent>;

  const character: Character = {
    id: 1,
    name: 'Goku',
    image: 'https://example.com/goku.png',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCardComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('character', character);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
