import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Caso } from 'src/app/model/caso.model';
import { ArchivoService } from 'src/app/service/archivo.service';
import { CasoService } from 'src/app/service/caso.service';

@Component({
  selector: 'app-ver-casos',
  templateUrl: './ver-casos.component.html',
  styleUrls: ['./ver-casos.component.css'],
  providers: [MessageService]
})
export class VerCasosComponent implements OnInit {

  casos: Caso[] = [];
  displayVerificarCaso: boolean = false;
  caso: Caso = {
    idCaso: 0,
    descripcion: "",
    soporte: "",
    estadoCaso: "",
    usuario: "",
    pagoCaso: {
      idPago: 0,
      descripcion:""
    },
    empresa: "",
    local: ""
  };

  constructor(private router: Router, private casoService: CasoService, private archivoService: ArchivoService, private messageService: MessageService) { }

  getAllCasos() {

    this.casoService.getAllCasos().subscribe(

      data => {

        if(data.status == 200) {

          if(data.body) {

            // Mostrar tabla de casos
            this.casos = data.body;

          }

        } else {

          this.messageService.add({key: 'verCasosToast', severity:'error', summary: 'Error', detail: 'Error al cargar los casos'});

        }

      }, error => {

        if(error.status == 400) {

          this.messageService.add({key: 'verCasosToast', severity:'error', summary: 'Error', detail: 'Error al cargar los casos'});

        } else {

          this.messageService.add({key: 'verCasosToast', severity:'error', summary: 'Error', detail: 'Error al cargar los casos'});

        }

      }
      
    );

  }

  getCasoById(idCaso: number) {

    this.casoService.getCasoById(idCaso).subscribe(

      data => {

        if(data.status == 200) {

          if(data.body) {

            // Traer información de un caso por su ID
            this.caso = data.body;

          }

        } else {

          this.messageService.add({key: 'verCasosToast', severity:'error', summary: 'Error', detail: 'Error al cargar el caso'});

        }

      }, error => {

        if(error.status == 404) {

          this.messageService.add({key: 'verCasosToast', severity:'error', summary: 'Error', detail: 'Error al cargar el caso, caso no encontrado'});

        } else if(error.status == 400) {

          this.messageService.add({key: 'verCasosToast', severity:'error', summary: 'Error', detail: 'Error al cargar el caso'});

        } else {

          this.messageService.add({key: 'verCasosToast', severity:'error', summary: 'Error', detail: 'Error al cargar el caso'});

        }

      }
      
    );

  }

  mostrarDialogVerificarCaso(idCaso: number) {

    this.getCasoById(idCaso);
    this.displayVerificarCaso = true;

  }

  finalizarCaso(idCaso: number) {

    // Asignar estado finalizado al caso
    this.caso.estadoCaso = "Finalizado";

    this.casoService.updateCasoById(idCaso, this.caso).subscribe(

      data => {

        if(data.status == 200) {

          if(data.body) {

            // Actualizar el caso para que pase a finalizado
            this.caso = data.body;

          }

          this.displayVerificarCaso = false;
          this.getAllCasos();
          this.messageService.add({key: 'verCasosToast', severity:'success', summary: 'Éxito', detail: 'Caso finalizado con éxito'});

        } else {

          this.messageService.add({key: 'verCasosToast', severity:'error', summary: 'Error', detail: 'Error al finalizar el caso'});

        }

      }, error => {

        if(error.status == 404) {

          this.messageService.add({key: 'verCasosToast', severity:'error', summary: 'Error', detail: 'Error al finalizar el caso, verifique los datos ingresados'});

        } else if(error.status == 400) {

          this.messageService.add({key: 'verCasosToast', severity:'error', summary: 'Error', detail: 'Error al finalizar el caso'});

        } else {

          this.messageService.add({key: 'verCasosToast', severity:'error', summary: 'Error', detail: 'Error al finalizar el caso'});

        }

        console.log(error);
        this.messageService.add({key: 'verCasosToast', severity:'error', summary: 'Error', detail: 'Error al finalizar el caso'});

      }

    )

  }

  bajarArchivo(soporte: string) {

    this.archivoService.bajarArchivo(soporte).subscribe(

      data => {

        // Descargar soporte del caso seleccionado
        const dataType = data.type;
        const binaryData = [];
        binaryData.push(data);

        const filePath = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        const downloadLink = document.createElement('a');
        downloadLink.href = filePath;
        downloadLink.setAttribute('download', soporte);
        document.body.appendChild(downloadLink);
        downloadLink.click();

        this.messageService.add({key: 'verCasosToast', severity:'success', summary: 'Éxito', detail: 'Archivo descargado con éxito'});

      }, error => {

        console.log(error);
        this.messageService.add({key: 'verCasosToast', severity:'error', summary: 'Error', detail: 'Error al descargar el archivo'});

      }
      
    );

  }

  ngOnInit(): void {

    this.getAllCasos();

  }

}