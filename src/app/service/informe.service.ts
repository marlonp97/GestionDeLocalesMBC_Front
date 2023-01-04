import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Informe } from '../model/informe.model';

@Injectable({
  providedIn: 'root'
})
export class InformeService {

  urlBase: string = "http://localhost:8082/api/v1/informe";

  constructor(private httpClient: HttpClient) { }

  getAllInforme() : Observable<HttpResponse<Informe[]>> {

    return this.httpClient.get<Informe[]>(`${this.urlBase}/`, {observe: 'response'});

  }

  generarInforme() : Observable<HttpResponse<any>> {

    return this.httpClient.get<any>(`${this.urlBase}/generar/`, {observe: 'response'});

  }

}