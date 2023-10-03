import { Injectable } from '@angular/core';
import { Starship, StarshipPageItem } from '../models/starship.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Page } from '../models/page.model';
import { SwapiResponse } from '../models/response.model';
import { environment } from 'src/environments/environment';

const { fleetLimit } = environment;

@Injectable({
  providedIn: 'root',
})
export class StarshipsService {
  private readonly baseUrl = `https://www.swapi.tech/api`;

  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<Page<StarshipPageItem>> {
    const url = `${this.baseUrl}/starships?page=1&limit=${fleetLimit}`;

    return this.httpClient.get<Page<StarshipPageItem>>(url);
  }

  public getById(id: number): Observable<SwapiResponse<Starship>> {
    const url = `${this.baseUrl}/starships/${id}`;

    return this.httpClient.get<SwapiResponse<Starship>>(url);
  }
}
