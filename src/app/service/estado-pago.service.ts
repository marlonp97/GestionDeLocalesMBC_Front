import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoPago } from '../model/estado-pago.model';

@Injectable({
  providedIn: 'root'
})
export class EstadoPagoService {

  urlBase: string = "http://localhost:8080/api/v1/estadosPago";

  constructor(private httpClient: HttpClient) { }

  getAllEstadosPago() : Observable<HttpResponse<EstadoPago[]>> {

    return this.httpClient.get<EstadoPago[]>(`${this.urlBase}/`, {observe: 'response'});

  }

}