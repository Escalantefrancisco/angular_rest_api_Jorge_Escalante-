import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import {
  DemonSlayerCharacter,
  DemonSlayerCharacterResponse,
  DemonSlayerCharactersResponse
} from '../models/demon-slayer-character';

@Injectable({
  providedIn: 'root'
})
export class DemonSlayerService {

  private http = inject(HttpClient);

  private apiUrl =
    'https://www.demonslayer-api.com/api/v1/characters';

  getCharacters(
    page: number = 1,
    limit: number = 12
  ): Observable<DemonSlayerCharactersResponse> {

    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    return this.http.get<DemonSlayerCharactersResponse>(
      this.apiUrl,
      { params }
    );
  }

  getCharacterById(id: number): Observable<DemonSlayerCharacter> {

    const params = new HttpParams()
      .set('id', id);

    return this.http.get<DemonSlayerCharacterResponse>(
      this.apiUrl,
      { params }
    ).pipe(
      map(response => {
        const character = response.content[0];
        if (!character) {
          throw new Error(`No se encontró el personaje con id ${id}.`);
        }
        return character;
      })
    );
  }
}