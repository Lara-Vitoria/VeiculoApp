import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, take } from 'rxjs';

import { Veiculos } from '../models/Veiculos.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class VeiculoService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiURL + 'api/Veiculos';

  public getVeiculos(): Observable<Veiculos[]> {
    return this.http.get<Veiculos[]>
      (this.baseUrl)
      .pipe(take(1));
  }

  public getVeiculoById(id: number): Observable<Veiculos> {
    return this.http.get<Veiculos>
      (`${this.baseUrl}/${id}`)
      .pipe(take(1));
  }

  public post(veiculo: Veiculos): Observable<Veiculos> {
    return this.http.post<Veiculos>
      (`${this.baseUrl}`, veiculo)
      .pipe(take(1));
  }

  public put(veiculo: Veiculos, id: number): Observable<Veiculos> {
    return this.http.put<Veiculos>
      (`${this.baseUrl}/${id}`, veiculo)
      .pipe(take(1));
  }

  public upload(file: File): Observable<any> {

    const formData = new FormData();
    formData.append('imagem', file)
    return this.http.post<any>
      (`${this.baseUrl}/upload-img`, formData, { responseType: 'text' as 'json' })
      .pipe(take(1));
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>
      (`${this.baseUrl}/${id}`)
      .pipe(take(1));
  }
}
