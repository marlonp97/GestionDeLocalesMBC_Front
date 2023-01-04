import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PagoHistorico } from 'src/app/model/pago-historico.model';
import { ArchivoService } from 'src/app/service/archivo.service';
import { PagoService } from 'src/app/service/pago.service';

@Component({
  selector: 'app-ver-pagos-historico',
  templateUrl: './ver-pagos-historico.component.html',
  styleUrls: ['./ver-pagos-historico.component.css'],
  providers: [MessageService]
})
export class VerPagosHistoricoComponent implements OnInit {

  pagosHistorico: PagoHistorico[] = [];

  constructor(private pagoService: PagoService, private archivoService: ArchivoService, private messageService: MessageService) { }

  getPagosHistoricoByIdUsuario(idUsuario: number) {

    this.pagoService.getPagosHistoricoByIdUsuario(idUsuario).subscribe(

      data => {

        if(data.status == 200) {

          if(data.body) {

            // Mostrar tabla de pagos finalizados
            this.pagosHistorico = data.body;

          }

        } else {

          this.messageService.add({key: 'verPagosHistoricoToast', severity:'error', summary: 'Error', detail: 'Error al cargar los pagos'});

        }

      }, error => {

        if(error.status == 404) {

          this.messageService.add({key: 'verPagosHistoricoToast', severity:'error', summary: 'Error', detail: 'Error al cargar los pagos, usuario no encontrado'});

        } else if(error.status == 400) {

          this.messageService.add({key: 'verPagosHistoricoToast', severity:'error', summary: 'Error', detail: 'Error al cargar los pagos'});

        } else {

          this.messageService.add({key: 'verPagosHistoricoToast', severity:'error', summary: 'Error', detail: 'Error al cargar los pagos'});

        }

      }
      
    );

  }

  bajarArchivo(soporte: string) {

    this.archivoService.bajarArchivo(soporte).subscribe(

      data => {

        // Descargar soporte del pago seleccionado
        const dataType = data.type;
        const binaryData = [];
        binaryData.push(data);

        const filePath = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        const downloadLink = document.createElement('a');
        downloadLink.href = filePath;
        downloadLink.setAttribute('download', soporte);
        document.body.appendChild(downloadLink);
        downloadLink.click();

        this.messageService.add({key: 'verPagosHistoricoToast', severity:'success', summary: 'Éxito', detail: 'Archivo descargado con éxito'});

      }, error => {
        
        this.messageService.add({key: 'verPagosHistoricoToast', severity:'error', summary: 'Error', detail: 'Error al descargar el archivo'});

      }
      
    );

  }

  ngOnInit(): void {

    this.getPagosHistoricoByIdUsuario(Number(localStorage.getItem("idUsuario")));

  }

}