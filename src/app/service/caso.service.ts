import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Caso } from '../model/caso.model';

@Injectable({
  providedIn: 'root'
})
export class CasoService {

  urlBase: string = "http://localhost:8080/api/v1/casos";

  constructor(private httpClient: HttpClient) { }

  getAllCasos() : Observable<HttpResponse<Caso[]>> {

    return this.httpClient.get<Caso[]>(`${this.urlBase}/`, {observe: 'response'});

  }

  createCaso(caso: Caso) : Observable<HttpResponse<Caso>> {

    return this.httpClient.post<Caso>(`${this.urlBase}/`, caso, {observe: 'response'});

  }

  getCasoById(idCaso: number): Observable<HttpResponse<Caso>> {

    return this.httpClient.get<Caso>(`${this.urlBase}/${idCaso}`, {observe: 'response'});

  }

  updateCasoById(idCaso: number, caso: Caso): Observable<HttpResponse<Caso>> {

    return this.httpClient.put<Caso>(`${this.urlBase}/${idCaso}`, caso, {observe: 'response'});

  }

}