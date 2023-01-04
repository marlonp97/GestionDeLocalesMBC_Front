import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Archivo } from '../model/archivo.model';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  urlBase: string = "http://localhost:8080/api/v1/archivos";

  constructor(private httpClient: HttpClient) { }

  subirArchivo(soporte: File): Observable<HttpResponse<Archivo>> {

    const formData: FormData = new FormData();
    formData.append('soporte', soporte);

    return this.httpClient.post<Archivo>(`${this.urlBase}/subir/`, formData, {observe: 'response'});

  }

  bajarArchivo(nombreArchivo: string): Observable<any> {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.get<any>(`${this.urlBase}/bajar/${nombreArchivo}`, {headers, responseType: 'blob' as 'json'});

  }

}