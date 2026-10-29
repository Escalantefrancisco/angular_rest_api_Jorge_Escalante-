import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { DigimonService } from './digimon';

describe('DigimonService', () => {
  let service: DigimonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(DigimonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
