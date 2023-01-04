import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioLogin } from '../model/usuario-login.model';
import { UsuarioPago } from '../model/usuario-pago.model';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  urlBase: string = "http://localhost:8080/api/v1/usuarios";

  constructor(private httpClient: HttpClient) { }

  getAllUsuarios() : Observable<HttpResponse<Usuario[]>> {

    return this.httpClient.get<Usuario[]>(`${this.urlBase}/`, {observe: 'response'});

  }

  getAllUsuariosPago() : Observable<HttpResponse<UsuarioPago[]>> {

    return this.httpClient.get<UsuarioPago[]>(`${this.urlBase}/pago/`, {observe: 'response'});

  }

  login(usuarioLogin: UsuarioLogin) : Observable<HttpResponse<Usuario>> {

    return this.httpClient.post<Usuario>(`${this.urlBase}/login/`, usuarioLogin, {observe: 'response'});

  }

}