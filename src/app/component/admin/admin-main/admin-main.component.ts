import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {

  items: MenuItem[] = [];

  constructor(private router: Router) { }

  cerrarSesion() {

    localStorage.clear();
    this.router.navigate(['login']);

  }

  mostrarMenu() {

    this.items = [

      {
        label:'Usuarios',
        routerLink: '/admin/verUsuarios'
      },
      {
        label:'Empresas',
        routerLink: '/admin/verEmpresas'
      },
      {
        label:'Locales',
        routerLink: '/admin/verLocales'
      },
      {
        label:'Pagos',
        routerLink: '/admin/verPagos'
      },
      {
        label:'Casos',
        routerLink: '/admin/verCasos'
      },
      {
        label:'Informe',
        routerLink: '/admin/verInforme'
      }
      
    ];

  }

  ngOnInit(): void {

    this.mostrarMenu();

  }

}