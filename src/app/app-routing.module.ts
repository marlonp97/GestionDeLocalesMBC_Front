import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { AdminMainComponent } from './component/admin/admin-main/admin-main.component';
import { VerUsuariosComponent } from './component/admin/ver-usuarios/ver-usuarios.component';
import { VerEmpresasComponent } from './component/admin/ver-empresas/ver-empresas.component';
import { VerLocalesComponent } from './component/admin/ver-locales/ver-locales.component';
import { VerPagosComponent } from './component/admin/ver-pagos/ver-pagos.component';
import { VerCasosComponent } from './component/admin/ver-casos/ver-casos.component';
import { VerInformeComponent } from './component/admin/ver-informe/ver-informe.component';
import { ClienteMainComponent } from './component/cliente/cliente-main/cliente-main.component';
import { VerPagosHistoricoComponent } from './component/cliente/ver-pagos-historico/ver-pagos-historico.component';
import { VerPagosPendientesComponent } from './component/cliente/ver-pagos-pendientes/ver-pagos-pendientes.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminMainComponent, children: [
    {path: '', redirectTo: 'verPagos', pathMatch: 'full'},
    {path: 'verUsuarios', component: VerUsuariosComponent},
    {path: 'verEmpresas', component: VerEmpresasComponent},
    {path: 'verLocales', component: VerLocalesComponent},
    {path: 'verPagos', component: VerPagosComponent},
    {path: 'verCasos', component: VerCasosComponent},
    {path: 'verInforme', component: VerInformeComponent}
  ]},
  {path: 'cliente', component: ClienteMainComponent, children: [
    {path: '', redirectTo: 'verPagosPendientes', pathMatch: 'full'},
    {path: 'verPagosHistorico', component: VerPagosHistoricoComponent},
    {path: 'verPagosPendientes', component: VerPagosPendientesComponent}
  ]},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }