import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoPago } from '../model/tipo-pago.model';

@Injectable({
  providedIn: 'root'
})
export class TipoPagoService {

  urlBase: string = "http://localhost:8080/api/v1/tiposPago";

  constructor(private httpClient: HttpClient) { }

  getAllTiposPago() : Observable<HttpResponse<TipoPago[]>> {

    return this.httpClient.get<TipoPago[]>(`${this.urlBase}/`, {observe: 'response'});

  }

}