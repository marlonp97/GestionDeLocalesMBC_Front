import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalPago } from '../model/local-pago.model';
import { Local } from '../model/local.model';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  urlBase: string = "http://localhost:8080/api/v1/locales";

  constructor(private httpClient: HttpClient) { }

  getAllLocales() : Observable<HttpResponse<Local[]>> {

    return this.httpClient.get<Local[]>(`${this.urlBase}/`, {observe: 'response'});

  }

  getAllLocalesPago() : Observable<HttpResponse<LocalPago[]>> {

    return this.httpClient.get<LocalPago[]>(`${this.urlBase}/pago/`, {observe: 'response'});

  }

}