import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { Character } from '../models/character';
import { CharacterResponse } from '../models/character-response';
import { DragonballService } from './dragonball';

describe('DragonballService', () => {
  let service: DragonballService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(DragonballService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should request a page of characters', () => {
    const response: CharacterResponse = {
      items: [],
      meta: {
        totalItems: 0,
        itemCount: 0,
        itemsPerPage: 12,
        totalPages: 0,
        currentPage: 1,
      },
      links: { first: '', previous: '', next: '', last: '' },
    };

    service.getCharacters(1, 12).subscribe((result) => {
      expect(result).toEqual(response);
    });

    const request = httpTestingController.expectOne(
      'https://dragonball-api.com/api/characters?page=1&limit=12',
    );
    expect(request.request.method).toBe('GET');
    request.flush(response);
  });

  it('should request a character by id', () => {
    const character: Character = {
      id: 1,
      name: 'Goku',
      image: 'https://example.com/goku.png',
    };

    service.getCharacterById(1).subscribe((result) => {
      expect(result).toEqual(character);
    });

    const request = httpTestingController.expectOne(
      'https://dragonball-api.com/api/characters/1',
    );
    expect(request.request.method).toBe('GET');
    request.flush(character);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
