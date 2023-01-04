import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../model/empresa.model';
import { EmpresaPago } from '../model/empresa-pago.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  urlBase: string = "http://localhost:8080/api/v1/empresas";

  constructor(private httpClient: HttpClient) { }

  getAllEmpresas() : Observable<HttpResponse<Empresa[]>> {

    return this.httpClient.get<Empresa[]>(`${this.urlBase}/`, {observe: 'response'});

  }

  getAllEmpresasPago() : Observable<HttpResponse<EmpresaPago[]>> {

    return this.httpClient.get<EmpresaPago[]>(`${this.urlBase}/pago/`, {observe: 'response'});

  }

}