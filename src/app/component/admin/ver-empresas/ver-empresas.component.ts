import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Empresa } from 'src/app/model/empresa.model';
import { EmpresaService } from 'src/app/service/empresa.service';

@Component({
  selector: 'app-ver-empresas',
  templateUrl: './ver-empresas.component.html',
  styleUrls: ['./ver-empresas.component.css'],
  providers: [MessageService]
})
export class VerEmpresasComponent implements OnInit {

  empresas: Empresa[] = [];

  constructor(private empresaService: EmpresaService, private messageService: MessageService) { }

  getAllEmpresas() {

    this.empresaService.getAllEmpresas().subscribe(

      data => {

        if(data.status == 200) {

          if(data.body) {

            // Mostrar tabla de empresas
            this.empresas = data.body;

          }

        } else {

          this.messageService.add({key: 'verEmpresasToast', severity:'error', summary: 'Error', detail: 'Error al cargar las empresas'});

        }

      }, error => {

        if(error.status == 400) {

          this.messageService.add({key: 'verEmpresasToast', severity:'error', summary: 'Error', detail: 'Error al cargar las empresas'});

        } else {

          this.messageService.add({key: 'verEmpresasToast', severity:'error', summary: 'Error', detail: 'Error al cargar las empresas'});

        }

      }
      
    );

  }

  ngOnInit(): void {

    this.getAllEmpresas();

  }

}
