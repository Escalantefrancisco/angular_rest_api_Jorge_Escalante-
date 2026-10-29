import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { DigimonCardComponent } from './digimon-card';

describe('DigimonCardComponent', () => {
  let component: DigimonCardComponent;
  let fixture: ComponentFixture<DigimonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigimonCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DigimonCardComponent);
    fixture.componentRef.setInput('digimon', {
      id: 1,
      name: 'Agumon',
      image: 'agumon.png'
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
