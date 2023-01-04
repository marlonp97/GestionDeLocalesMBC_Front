import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { AppRoutingModule } from './app-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';

import { AppComponent } from './app.component';
import { VerUsuariosComponent } from './component/admin/ver-usuarios/ver-usuarios.component';
import { VerEmpresasComponent } from './component/admin/ver-empresas/ver-empresas.component';
import { VerLocalesComponent } from './component/admin/ver-locales/ver-locales.component';
import { VerPagosComponent } from './component/admin/ver-pagos/ver-pagos.component';
import { VerCasosComponent } from './component/admin/ver-casos/ver-casos.component';
import { LoginComponent } from './component/login/login.component';
import { VerPagosHistoricoComponent } from './component/cliente/ver-pagos-historico/ver-pagos-historico.component';
import { VerPagosPendientesComponent } from './component/cliente/ver-pagos-pendientes/ver-pagos-pendientes.component';
import { AdminMainComponent } from './component/admin/admin-main/admin-main.component';
import { ClienteMainComponent } from './component/cliente/cliente-main/cliente-main.component';
import { VerInformeComponent } from './component/admin/ver-informe/ver-informe.component';

@NgModule({
  declarations: [
    AppComponent,
    VerUsuariosComponent,
    VerEmpresasComponent,
    VerLocalesComponent,
    VerPagosComponent,
    VerCasosComponent,
    LoginComponent,
    VerPagosHistoricoComponent,
    VerPagosPendientesComponent,
    AdminMainComponent,
    ClienteMainComponent,
    VerInformeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    MenuModule,
    MenubarModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    PasswordModule,
    FormsModule,
    ButtonModule,
    CalendarModule,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    InputMaskModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }