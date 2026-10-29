import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { DigimonComponent } from './digimon';

describe('DigimonComponent', () => {
  let component: DigimonComponent;
  let fixture: ComponentFixture<DigimonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigimonComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DigimonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    TestBed.inject(HttpTestingController).expectOne(
      request => request.url === 'https://digi-api.com/api/v1/digimon'
    ).flush({
      content: [{ id: 1, name: 'Agumon', image: 'agumon.png' }],
      pageable: {
        currentPage: 0,
        elementsOnPage: 1,
        totalElements: 1,
        totalPages: 1
      }
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the Digimon returned by the API', () => {
    expect(fixture.nativeElement.textContent).toContain('Agumon');
    expect(fixture.nativeElement.textContent).toContain('Total de Digimon: 1');
    expect(fixture.nativeElement.textContent).not.toContain('Cargando Digimon');
  });
});
