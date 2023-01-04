import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EmpresaPago } from 'src/app/model/empresa-pago.model';
import { EstadoPago } from 'src/app/model/estado-pago.model';
import { LocalPago } from 'src/app/model/local-pago.model';
import { Pago } from 'src/app/model/pago.model';
import { TipoPago } from 'src/app/model/tipo-pago.model';
import { UsuarioPago } from 'src/app/model/usuario-pago.model';
import { ArchivoService } from 'src/app/service/archivo.service';
import { EmpresaService } from 'src/app/service/empresa.service';
import { EstadoPagoService } from 'src/app/service/estado-pago.service';
import { InformeService } from 'src/app/service/informe.service';
import { LocalService } from 'src/app/service/local.service';
import { PagoService } from 'src/app/service/pago.service';
import { TipoPagoService } from 'src/app/service/tipo-pago.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-ver-pagos',
  templateUrl: './ver-pagos.component.html',
  styleUrls: ['./ver-pagos.component.css'],
  providers: [MessageService]
})
export class VerPagosComponent implements OnInit {

  pagos: Pago[] = [];
  tiposPago: TipoPago[] = [];
  estadosPago: EstadoPago[] = [];
  usuariosPago: UsuarioPago[] = [];
  empresasPago: EmpresaPago[] = [];
  localesPago: LocalPago[] = [];
  displayAgregarPago: boolean = false;
  displayActualizarPago: boolean = false;
  displayVerificarPago: boolean = false;
  displaySubirCSV: boolean = false;
  archivoSeleccionadoCSV?: FileList;
  archivoActualCSV?: File;
  pago: Pago = {
    idPago: 0,
    descripcion: "",
    precio: 0,
    fechaVencimiento: "",
    soporte: "",
    valorPagado: 0,
    fechaPago: "",
    tipoPago: {
      idTipoPago: 0,
      tipo:""
    },
    estadoPago: {
      idEstadoPago: 0,
      estado: ""
    },
    usuarioPago: {
      idUsuario: 0,
      correo: ""
    },
    empresaPago: {
      idEmpresa: 0,
      nombre: ""
    },
    localPago: {
      idLocal: 0,
      direccion: ""
    }
  };

  constructor(private router: Router, private pagoService: PagoService, private tipoPagoService: TipoPagoService, private estadoPagoService: EstadoPagoService, private usuarioService: UsuarioService, private empresaService: EmpresaService, private localService: LocalService, private archivoService: ArchivoService, private messageService: MessageService, private informeService: InformeService) { }

  getAllPagos() {

    this.pagoService.getAllPagos().subscribe(

      data => {

        if(data.status == 200) {

          if(data.body) {

            // Mostrar tabla de pagos
            this.pagos = data.body;

          }

        } else {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al cargar los pagos'});

        }

      }, error => {

        if(error.status == 400) {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al cargar los pagos'});

        } else {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al cargar los pagos'});

        }

      }
      
    );

  }

  getPagoById(idPago: number) {

    this.pagoService.getPagoById(idPago).subscribe(

      data => {

        if(data.status == 200) {

          if(data.body) {

            // Traer información de un pago por su ID
            this.pago = data.body;

          }

        } else {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al carga el pago'});

        }        

      }, error => {

        if(error.status == 404) {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al cargar el pago, pago no encontrado'});

        } else if(error.status == 400) {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al cargar el pago'});

        } else {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al cargar el pago'});

        }

      }
      
    );

  }

  mostrarDialogVerificarPago(idPago: number) {

    this.getPagoById(idPago);
    this.displayVerificarPago = true;

  }

  mostrarDialogAgregarPago() {

    this.pago = {
      idPago: 0,
      descripcion: "",
      precio: 0,
      fechaVencimiento: "",
      soporte: "",
      valorPagado: 0,
      fechaPago: "",
      tipoPago: {
        idTipoPago: 0,
        tipo:""
      },
      estadoPago: {
        idEstadoPago: 0,
        estado: ""
      },
      usuarioPago: {
        idUsuario: 0,
        correo: ""
      },
      empresaPago: {
        idEmpresa: 0,
        nombre: ""
      },
      localPago: {
        idLocal: 0,
        direccion: ""
      }
    };

    this.displayAgregarPago = true;

  }

  mostrarDialogActualizarPago(idPago: number) {

    this.getPagoById(idPago);
    this.displayActualizarPago = true;

  }

  mostrarDialogSubirCSV() {

    this.displaySubirCSV = true;

  }

  seleccionarArchivoCSV(event: any): void {

    this.archivoSeleccionadoCSV = event.target.files;

  }

  subirArchivoCSV(): void {

    if(this.archivoSeleccionadoCSV) {

      const archivo: File | null = this.archivoSeleccionadoCSV.item(0);

      if(archivo) {

        this.archivoActualCSV = archivo;

        this.pagoService.createPagosCSV(this.archivoActualCSV).subscribe(

          data => {

            if(data.status == 200) {

              // Cargar archivo CSV con pagos
              this.displaySubirCSV = false;
              this.getAllPagos();
              this.messageService.add({key: 'verPagosToast', severity:'success', summary: 'Éxito', detail: 'Archivo subido con éxito'});

            } else {

              this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al subir el archivo'});

            }

          }, error => {

            if(error.status == 400) {

              this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al subir el archivo'});
    
            } else {
    
              this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al subir el archivo'});
    
            }
    
          }

        );

      }

      this.archivoSeleccionadoCSV = undefined;

    }    

  }

  rechazarPago(idPago: number) {

    // Asignar estado pendiente al pago
    this.pago.estadoPago.estado = "Pendiente";

    this.pagoService.updatePagoById(idPago, this.pago).subscribe(

      data => {

        if(data.status == 200) {

          if(data.body) {

            // Actualizar el pago para que pase a pendiente
            this.pago = data.body;

          }

          this.displayVerificarPago = false;
          this.getAllPagos();
          this.messageService.add({key: 'verPagosToast', severity:'success', summary: 'Éxito', detail: 'Pago rechazado con éxito'});

        } else {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al rechazar el pago'});

        }

      }, error => {

        if(error.status == 404) {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al rechazar el pago, verifique los datos ingresados'});

        } else if(error.status == 400) {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al rechazar el pago'});

        } else {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al rechazar el pago'});

        }

      }

    )

  }

  aprobarPago(idPago: number) {

    this.pagoService.aprobarPagoById(idPago, this.pago).subscribe(

      data => {

        if(data.status == 200) {

          if(data.body) {

            // Enviar el pago a aprobación
            this.pago = data.body;

          }

          this.displayVerificarPago = false;
          this.getAllPagos();
          this.messageService.add({key: 'verPagosToast', severity:'success', summary: 'Éxito', detail: 'Pago aprobado con éxito'});

        } else {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al aprobar el pago'});

        }

      }, error => {

        if(error.status == 404) {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al aprobar el pago, verifique los datos ingresados'});

        } else if(error.status == 400) {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al aprobar el pago'});

        } else {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al aprobar el pago'});

        }

      }

    )
    
  }

  agregarPago() {

    // Validaciones de los campos ingresados para crear un pago
    if((this.pago.descripcion == null) || (this.pago.descripcion == "") || (this.pago.descripcion.length > 50) || (this.pago.precio == null) || (this.pago.precio == 0) || (this.pago.precio < 0) || (this.pago.precio > 9999999999) || (this.pago.fechaVencimiento == null) || (this.pago.fechaVencimiento == "") || ((this.pago.tipoPago == null) ? true : ((this.pago.tipoPago.tipo == null) || (this.pago.tipoPago.tipo == ""))) || ((this.pago.localPago == null) ? true : ((this.pago.localPago.direccion == null) || (this.pago.localPago.direccion == "")))) {
      
      if((this.pago.descripcion == null) || (this.pago.descripcion == "")) {
        this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Por favor ingrese la descripción'});
      }
      if(this.pago.descripcion.length > 50) {
        this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'La descripción es demasiado larga'});
      }
      if((this.pago.precio == null) || (this.pago.precio == 0)) {
        this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Por favor ingrese el precio'});
      }
      if(this.pago.precio < 0) {
        this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'El precio debe ser positivo'});
      }
      if(this.pago.precio > 9999999999) {
        this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'El precio es demasiado grande'});
      }
      if((this.pago.fechaVencimiento == null) || (this.pago.fechaVencimiento == "")) {
        this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Por favor ingrese la fecha de vencimiento'});
      }
      if(this.pago.tipoPago == null) {
        this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Por favor ingrese el tipo de pago'});
      } else {
        if((this.pago.tipoPago.tipo == null) || (this.pago.tipoPago.tipo == "")) {
          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Por favor ingrese el tipo de pago'});
        }
      }
      if(this.pago.localPago == null) {
        this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Por favor ingrese el local del pago'});
      } else {
        if((this.pago.localPago.direccion == null) || (this.pago.localPago.direccion == "")) {
          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Por favor ingrese el local del pago'});
        }
      }

    } else {
    
      // Asignar estado pendiente al pago
      this.pago.estadoPago.estado = "Pendiente";

      this.pagoService.createPago(this.pago).subscribe(

        data => {

          if(data.status == 201) {

            if(data.body) {

              // Crear el pago
              this.pago = data.body;

            }

            this.displayAgregarPago = false;
            this.getAllPagos();
            this.messageService.add({key: 'verPagosToast', severity:'success', summary: 'Éxito', detail: 'Pago agregado con éxito'});

          } else {

            this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al agregar el pago'});

          }

        }, error => {

          if(error.status == 404) {

            this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al agregar el pago, verifique los datos ingresados'});

          } else if(error.status == 400) {

            this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al agregar el pago'});

          } else {

            this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al agregar el pago'});

          }

        }

      )

    }

  }

  actualizarPago(idPago: number) {

    // Validaciones de los campos ingresados para actualizar un pago
    if((this.pago.descripcion == null) || (this.pago.descripcion == "") || (this.pago.descripcion.length > 50) || (this.pago.precio == null) || (this.pago.precio == 0) || (this.pago.precio < 0) || (this.pago.precio > 9999999999) || (this.pago.fechaVencimiento == null) || (this.pago.fechaVencimiento == "") || (this.pago.valorPagado < 0) || (this.pago.valorPagado > 9999999999) || ((this.pago.tipoPago == null) ? true : ((this.pago.tipoPago.tipo == null) || (this.pago.tipoPago.tipo == ""))) || ((this.pago.estadoPago == null) ? true : ((this.pago.estadoPago.estado == null) || (this.pago.estadoPago.estado == ""))) || ((this.pago.localPago == null) ? true : ((this.pago.localPago.direccion == null) || (this.pago.localPago.direccion == "")))) {
      
      if((this.pago.descripcion == null) || (this.pago.descripcion == "")) {
        this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Por favor ingrese la descripción'});
      }
      if(this.pago.descripcion.length > 50) {
        this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'La descripción es demasiado larga'});
      }
      if((this.pago.precio == null) || (this.pago.precio == 0)) {
        this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Por favor ingrese el precio'});
      }
      if(this.pago.precio < 0) {
        this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'El precio debe ser positivo'});
      }
      if(this.pago.precio > 9999999999) {
        this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'El precio es demasiado grande'});
      }
      if((this.pago.fechaVencimiento == null) || (this.pago.fechaVencimiento == "")) {
        this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Por favor ingrese la fecha de vencimiento'});
      }
      if(this.pago.valorPagado < 0) {
        this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'El valor pagado debe ser positivo'});
      }
      if(this.pago.valorPagado > 9999999999) {
        this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'El valor pagado es demasiado grande'});
      }
      if(this.pago.tipoPago == null) {
        this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Por favor ingrese el tipo de pago'});
      } else {
        if((this.pago.tipoPago.tipo == null) || (this.pago.tipoPago.tipo == "")) {
          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Por favor ingrese el tipo de pago'});
        }
      }
      if(this.pago.estadoPago == null) {
        this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Por favor ingrese el estado del pago'});
      } else {
        if((this.pago.estadoPago.estado == null) || (this.pago.estadoPago.estado == "")) {
          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Por favor ingrese el estado del pago'});
        }
      }
      if(this.pago.localPago == null) {
        this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Por favor ingrese el local del pago'});
      } else {
        if((this.pago.localPago.direccion == null) || (this.pago.localPago.direccion == "")) {
          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Por favor ingrese el local del pago'});
        }
      }

    } else {

      this.pagoService.updatePagoById(idPago, this.pago).subscribe(

        data => {

          if(data.status == 200) {

            if(data.body) {

              // Actualizar el pago
              this.pago = data.body;

            }
            
            this.displayActualizarPago = false;
            this.getAllPagos();
            this.messageService.add({key: 'verPagosToast', severity:'success', summary: 'Éxito', detail: 'Pago actualizado con éxito'});

          } else {

            this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al actualizar el pago'});

          }

        }, error => {

          if(error.status == 404) {

            this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al actualizar el pago, verifique los datos ingresados'});

          } else if(error.status == 400) {

            this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al actualizar el pago'});

          } else {

            this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al actualizar el pago'});

          }

        }

      )

    }

  }

  eliminarPago(idPago: number) {

    this.pagoService.deletePagoById(idPago).subscribe(

      data => {

        if(data.status == 200) {

          // Eliminar el pago
          this.getAllPagos();
          this.messageService.add({key: 'verPagosToast', severity:'success', summary: 'Éxito', detail: 'Pago eliminado con éxito'});

        } else {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al eliminar el pago'});

        }

      }, error => {

        if(error.status == 404) {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al eliminar el pago, pago no encontrado'});

        } else if(error.status == 400) {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al eliminar el pago'});

        } else {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al eliminar el pago'});

        }

      }
      
    );

  }

  getAllTiposPago() {

    this.tipoPagoService.getAllTiposPago().subscribe(

      data => {

        if(data.status == 200) {

          if(data.body) {

            // Traer todos los tipos de pago
            this.tiposPago = data.body;

          }

        } else {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al cargar los tipos de pago'});

        }

      }, error => {

        if(error.status == 400) {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al cargar los tipos de pago'});

        } else {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al cargar los tipos de pago'});

        }

      }
      
    );

  }

  getAllEstadosPago() {

    this.estadoPagoService.getAllEstadosPago().subscribe(

      data => {

        if(data.status == 200) {

          if(data.body) {

            // Traer todos los estados de pago
            this.estadosPago = data.body;

          }

        } else {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al cargar los estados de pago'});

        }

      }, error => {

        if(error.status == 400) {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al cargar los estados de pago'});

        } else {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al cargar los estados de pago'});

        }

      }
      
    );

  }

  getAllUsuariosPago() {

    this.usuarioService.getAllUsuariosPago().subscribe(

      data => {

        if(data.status == 200) {

          if(data.body) {

            // Traer todos los usuarios de pago
            this.usuariosPago = data.body;

          }

        } else {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al cargar los usuarios'});

        }

      }, error => {

        if(error.status == 400) {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al cargar los usuarios'});

        } else {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al cargar los usuarios'});

        }

      }
      
    );

  }

  getAllEmpresasPago() {

    this.empresaService.getAllEmpresasPago().subscribe(

      data => {

        if(data.status == 200) {

          if(data.body) {

            // Traer todas las empresas de pago
            this.empresasPago = data.body;

          }

        } else {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al cargar las empresas'});

        }

      }, error => {

        if(error.status == 400) {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al cargar las empresas'});

        } else {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al cargar las empresas'});

        }

      }
      
    );

  }

  getAllLocalesPago() {

    this.localService.getAllLocalesPago().subscribe(

      data => {

        if(data.status == 200) {

          if(data.body) {

            // Traer todos los locales de pago
            this.localesPago = data.body;

          }

        } else {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al cargar los locales'});

        }

      }, error => {

        if(error.status == 400) {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al cargar los locales'});

        } else {

          this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al cargar los locales'});

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

        this.messageService.add({key: 'verPagosToast', severity:'success', summary: 'Éxito', detail: 'Archivo descargado con éxito'});

      }, error => {

        this.messageService.add({key: 'verPagosToast', severity:'error', summary: 'Error', detail: 'Error al descargar el archivo'});

      }
      
    );

  }

  ngOnInit(): void {

    this.getAllTiposPago();
    this.getAllEstadosPago();
    this.getAllUsuariosPago();
    this.getAllEmpresasPago();
    this.getAllLocalesPago();
    this.getAllPagos();

  }

}