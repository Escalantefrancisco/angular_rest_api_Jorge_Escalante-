
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Digimon } from '../models/digimon';
import { DigimonResponse } from '../models/digimon-response';

@Injectable({
  providedIn: 'root'
})
export class DigimonService {
  private http = inject(HttpClient);

  private apiUrl = 'https://digi-api.com/api/v1/digimon';

  getDigimon(
    page: number = 0,
    pageSize: number = 12
  ): Observable<DigimonResponse> {
    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    return this.http.get<DigimonResponse>(
      this.apiUrl,
      { params }
    );
  }

  getDigimonById(id: number): Observable<Digimon> {
    return this.http.get<Digimon>(
      `${this.apiUrl}/${id}`
    );
  }
}
