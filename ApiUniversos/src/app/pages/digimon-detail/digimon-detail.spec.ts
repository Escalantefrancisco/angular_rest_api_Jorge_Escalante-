import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { DigimonDetailComponent } from './digimon-detail';

describe('DigimonDetailComponent', () => {
  let component: DigimonDetailComponent;
  let fixture: ComponentFixture<DigimonDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigimonDetailComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DigimonDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
