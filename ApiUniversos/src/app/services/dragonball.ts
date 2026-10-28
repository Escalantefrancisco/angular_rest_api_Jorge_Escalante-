import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Character } from '../models/character';
import { CharacterResponse } from '../models/character-response';

@Injectable({
  providedIn: 'root'
})
export class DragonballService {
  private http = inject(HttpClient);

  private apiUrl = 'https://dragonball-api.com/api';

  getCharacters(
    page: number = 1,
    limit: number = 12
  ): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(
      `${this.apiUrl}/characters?page=${page}&limit=${limit}`
    );
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(
      `${this.apiUrl}/characters/${id}`
    );
  }
}