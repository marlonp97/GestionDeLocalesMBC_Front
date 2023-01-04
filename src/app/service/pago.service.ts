import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagoHistorico } from '../model/pago-historico.model';
import { PagoPendiente } from '../model/pago-pendiente.model';
import { Pago } from '../model/pago.model';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  urlBase: string = "http://localhost:8080/api/v1/pagos";

  constructor(private httpClient: HttpClient) { }

  getAllPagos() : Observable<HttpResponse<Pago[]>> {

    return this.httpClient.get<Pago[]>(`${this.urlBase}/`, {observe: 'response'});

  }

  createPago(pago: Pago) : Observable<HttpResponse<Pago>> {

    return this.httpClient.post<Pago>(`${this.urlBase}/`, pago, {observe: 'response'});

  }

  getPagoById(idPago: number): Observable<HttpResponse<Pago>> {

    return this.httpClient.get<Pago>(`${this.urlBase}/${idPago}`, {observe: 'response'});

  }

  updatePagoById(idPago: number, pago: Pago): Observable<HttpResponse<Pago>> {

    return this.httpClient.put<Pago>(`${this.urlBase}/${idPago}`, pago, {observe: 'response'});

  }

  deletePagoById(idPago: number): Observable<HttpResponse<any>> {

    return this.httpClient.delete(`${this.urlBase}/${idPago}`, {observe: 'response'});

  }

  getPagosHistoricoByIdUsuario(idUsuario: number): Observable<HttpResponse<PagoHistorico[]>> {

    return this.httpClient.get<PagoHistorico[]>(`${this.urlBase}/historico/${idUsuario}`, {observe: 'response'});

  }

  getPagosPendientesByIdUsuario(idUsuario: number): Observable<HttpResponse<PagoPendiente[]>> {

    return this.httpClient.get<PagoPendiente[]>(`${this.urlBase}/pendientes/${idUsuario}`, {observe: 'response'});

  }

  generarPazYSalvo(idUsuario: number): Observable<HttpResponse<any>> {

    return this.httpClient.get(`${this.urlBase}/pazYSalvo/${idUsuario}`, {observe: 'response'});

  }

  aprobarPagoById(idPago: number, pago: Pago): Observable<HttpResponse<Pago>> {

    return this.httpClient.put<Pago>(`${this.urlBase}/aprobar/${idPago}`, pago, {observe: 'response'});

  }

  createPagosCSV(soporte: File): Observable<HttpResponse<Pago[]>> {

    const formData: FormData = new FormData();
    formData.append('archivo', soporte);

    return this.httpClient.post<Pago[]>(`${this.urlBase}/masivo/`, formData, {observe: 'response'});

  }

}