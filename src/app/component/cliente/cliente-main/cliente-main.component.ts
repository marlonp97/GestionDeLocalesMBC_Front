import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-cliente-main',
  templateUrl: './cliente-main.component.html',
  styleUrls: ['./cliente-main.component.css']
})
export class ClienteMainComponent implements OnInit {

  items: MenuItem[] = [];

  constructor(private router: Router) { }

  cerrarSesion() {

    localStorage.clear();
    this.router.navigate(['login']);

  }

  mostrarMenu() {

    this.items = [
      {
          label:'Histórico de pagos',
          routerLink: '/cliente/verPagosHistorico'
      },
      {
          label:'Pagos pendientes',
          routerLink: '/cliente/verPagosPendientes'
      }
    ];

  }

  ngOnInit(): void {

    this.mostrarMenu();

  }

}