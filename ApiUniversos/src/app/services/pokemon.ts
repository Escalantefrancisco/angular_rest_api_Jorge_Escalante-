
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, switchMap, map } from 'rxjs';

import { Pokemon } from '../models/pokemon';
import { PokemonResponse } from '../models/pokemon-response';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient);

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  getPokemons(
    page: number = 0,
    pageSize: number = 12
  ): Observable<{ count: number; items: Pokemon[] }> {

    const params = new HttpParams()
      .set('limit', pageSize)
      .set('offset', page * pageSize);

    return this.http
      .get<PokemonResponse>(this.apiUrl, { params })
      .pipe(
        switchMap(response => {
          const requests = response.results.map(pokemon =>
            this.http.get<Pokemon>(pokemon.url)
          );

          return forkJoin(requests).pipe(
            map(items => ({
              count: response.count,
              items
            }))
          );
        })
      );
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${id}`);
  }
}
