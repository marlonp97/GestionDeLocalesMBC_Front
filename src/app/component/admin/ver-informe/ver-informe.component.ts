import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Informe } from 'src/app/model/informe.model';
import { ArchivoService } from 'src/app/service/archivo.service';
import { InformeService } from 'src/app/service/informe.service';

@Component({
  selector: 'app-ver-informe',
  templateUrl: './ver-informe.component.html',
  styleUrls: ['./ver-informe.component.css'],
  providers: [MessageService]
})
export class VerInformeComponent implements OnInit {

  informes: Informe[] = [];

  constructor(private informeService: InformeService, private messageService: MessageService, private archivoService: ArchivoService) { }

  getAllInforme() {

    this.informeService.getAllInforme().subscribe(

      data => {

        if(data.status == 200) {

          if(data.body) {

            // Mostrar tabla del informe
            this.informes = data.body;

          }

        } else {

          this.messageService.add({key: 'verInformeToast', severity:'error', summary: 'Error', detail: 'Error al cargar el informe'});

        }

      }, error => {

        if(error.status == 400) {

          this.messageService.add({key: 'verInformeToast', severity:'error', summary: 'Error', detail: 'Error al cargar el informe'});

        } else {

          this.messageService.add({key: 'verInformeToast', severity:'error', summary: 'Error', detail: 'Error al cargar el informe'});

        }

      }
      
    );

  }

  generarInformeCSV() {

    this.informeService.generarInforme().subscribe(

      data => {

        if(data.status == 200) {

          // Generar informe de pagos
          this.getAllInforme();
          this.messageService.add({key: 'verInformeToast', severity:'success', summary: 'Éxito', detail: 'Informe generado con éxito'});

        } else {

          this.messageService.add({key: 'verInformeToast', severity:'error', summary: 'Error', detail: 'Error al generar el informe'});

        }

      }, error => {

        if(error.status == 400) {

          this.messageService.add({key: 'verInformeToast', severity:'error', summary: 'Error', detail: 'Error al generar el informe'});

        } else {

          this.messageService.add({key: 'verInformeToast', severity:'error', summary: 'Error', detail: 'Error al generar el informe'});

        }

      }

    )

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

        this.messageService.add({key: 'verInformeToast', severity:'success', summary: 'Éxito', detail: 'Archivo descargado con éxito'});

      }, error => {

        this.messageService.add({key: 'verInformeToast', severity:'error', summary: 'Error', detail: 'Error al descargar el archivo'});

      }
      
    );

  }

  ngOnInit(): void {

    this.getAllInforme();

  }

}