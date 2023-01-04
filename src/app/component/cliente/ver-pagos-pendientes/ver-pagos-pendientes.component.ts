import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Caso } from 'src/app/model/caso.model';
import { PagoPendiente } from 'src/app/model/pago-pendiente.model';
import { Pago } from 'src/app/model/pago.model';
import { PagoService } from 'src/app/service/pago.service';
import { CasoService } from 'src/app/service/caso.service';
import { ArchivoService } from 'src/app/service/archivo.service';
import { Archivo } from 'src/app/model/archivo.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ver-pagos-pendientes',
  templateUrl: './ver-pagos-pendientes.component.html',
  styleUrls: ['./ver-pagos-pendientes.component.css'],
  providers: [MessageService]
})
export class VerPagosPendientesComponent implements OnInit {

  idUsuario: number = 0;
  pagosPendientes: PagoPendiente[] = [];
  displayRegistrarPago: boolean = false;
  displayRegistrarCaso: boolean = false;
  archivoSeleccionadoPago?: FileList;
  archivoSeleccionadoCaso?: FileList;
  archivoActualPago?: File;
  archivoActualCaso?: File;
  archivoPago: Archivo = {
    soporte: ""
  }
  archivoCaso: Archivo = {
    soporte: ""
  }
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

  constructor(private router: Router, private pagoService: PagoService, private casoService: CasoService, private archivoService: ArchivoService, private messageService: MessageService) { }

  getPagosPendientesByIdUsuario(idUsuario: number) {

    this.pagoService.getPagosPendientesByIdUsuario(idUsuario).subscribe(

      data => {

        if(data.status == 200) {

          if(data.body) {

            // Mostrar tabla de pagos pendientes
            this.pagosPendientes = data.body;

          }

        } else {

          this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al cargar los pagos'});

        }

      }, error => {

        if(error.status == 404) {

          this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al cargar los pagos, usuario no encontrado'});

        } else if(error.status == 400) {

          this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al cargar los pagos'});

        } else {

          this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al cargar los pagos'});

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

          this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al carga el pago'});

        }

      }, error => {

        if(error.status == 404) {

          this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al carga el pago, pago no encontrado'});

        } else if(error.status == 400) {

          this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al carga el pago'});

        } else {

          this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al carga el pago'});

        }

      }
      
    );

  }
  
  generarPazYSalvo() {

    this.pagoService.generarPazYSalvo(this.idUsuario).subscribe(

      data => {

        if(data.status == 200) {

          // Generar paz y salvo del usuario
          this.messageService.add({key: 'verPagosPendientesToast', severity:'success', summary: 'Éxito', detail: 'Paz y salvo descargado con éxito'});

        } else {

          this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al descargar el paz y salvo'});

        }

      }, error => {

        if(error.status == 404) {

          this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al descargar el paz y salvo, datos no encontrados'});

        } else if(error.status == 400) {

          this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al descargar el paz y salvo'});

        } else if(error.status == 417) {

          this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al descargar el paz y salvo, usted tiene pagos pendientes'});

        } else {

          this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al descargar el paz y salvo'});

        }

      }
      
    );

  }

  mostrarDialogRegistrarPago(idPago: number) {

    this.getPagoById(idPago);
    this.displayRegistrarPago = true;

  }

  mostrarDialogRegistrarCaso(idPago: number) {

    this.caso = {
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

    this.getPagoById(idPago);
    this.displayRegistrarCaso = true;

  }

  registrarPago(idPago: number) {

    // Validaciones de los campos ingresados para realizar un pago
    if((this.pago.fechaPago == null) || (this.pago.fechaPago == "") || (this.pago.valorPagado == null) || (this.pago.valorPagado == 0) || (this.pago.valorPagado < 0) || (this.pago.valorPagado > 9999999999) || (this.pago.soporte == null) || (this.pago.soporte == "") || (this.pago.soporte.length > 260)) {
      
      if((this.pago.fechaPago == null) || (this.pago.fechaPago == "")) {
        this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Por favor ingrese la fecha de pago'});
      }
      if((this.pago.valorPagado == null) || (this.pago.valorPagado == 0)) {
        this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Por favor ingrese el valor pagado'});
      }
      if(this.pago.valorPagado < 0) {
        this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'El valor pagado debe ser positivo'});
      }
      if(this.pago.valorPagado > 9999999999) {
        this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'El valor pagado es demasiado grande'});
      }
      if((this.pago.soporte == null) || (this.pago.soporte == "")) {
        this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Por favor ingrese el soporte'});
      }
      if(this.pago.soporte.length > 260) {
        this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'El nombre del soporte es demasiado largo'});
      }

    } else {

      // Asignar estado de revisión al pago
      this.pago.estadoPago.idEstadoPago = 2;
      this.pago.estadoPago.estado = "Revisión";
      this.pago.usuarioPago = {
        idUsuario: (localStorage.getItem("idUsuario") != null) ? Number(localStorage.getItem("idUsuario")) : 0,
        correo: (localStorage.getItem("correo") != null) ? localStorage.getItem("correo")! : ""
      };
      this.pago.empresaPago = {
        idEmpresa: 0,
        nombre: (localStorage.getItem("empresa") != null) ? localStorage.getItem("empresa")! : ""
      };
  
      this.pagoService.updatePagoById(idPago, this.pago).subscribe(
  
        data => {
  
          if(data.status == 200) {
  
            if(data.body) {

              // Actualizar el pago para que pase a revisión
              this.pago = data.body;
  
            }
            
            this.displayRegistrarPago = false;
            this.getPagosPendientesByIdUsuario(this.idUsuario);
            this.messageService.add({key: 'verPagosPendientesToast', severity:'success', summary: 'Éxito', detail: 'Pago registrado con éxito'});
  
          } else {
  
            this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al registrar el pago'});
  
          }
  
        }, error => {
  
          if(error.status == 404) {
  
            this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al registrar el pago, verifique los datos ingresados'});
  
          } else if(error.status == 400) {
  
            this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al registrar el pago'});
  
          } else {
  
            this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al registrar el pago'});
  
          }
  
        }
  
      )

    }

  }

  registrarCaso() {

    // Validaciones de los campos ingresados para generar un caso
    if((this.caso.descripcion == null) || (this.caso.descripcion == "") || (this.caso.descripcion.length > 280) || (this.caso.soporte.length > 260)) {
      
      if((this.caso.descripcion == null) || (this.caso.descripcion == "")) {
        this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Por favor ingrese la descripción el caso'});
      }
      if(this.caso.descripcion.length > 280) {
        this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'La descripción del caso es demasiado larga'});
      }
      if(this.caso.soporte.length > 260) {
        this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'El nombre del soporte es demasiado largo'});
      }     

    } else {

      // Asignar estado pendiente al caso
      this.caso.estadoCaso = "Pendiente";
      this.caso.usuario = (localStorage.getItem("correo") != null) ? localStorage.getItem("correo")! : "";
      this.caso.pagoCaso = {
        idPago: this.pago.idPago,
        descripcion: this.pago.descripcion
      };
      (localStorage.getItem("correo") != null) ? localStorage.getItem("correo")! : ""
      this.caso.empresa = (this.pago.empresaPago != null) ? this.pago.empresaPago.nombre : "";
      this.caso.local = (this.pago.localPago != null) ? this.pago.localPago.direccion : "";

      this.casoService.createCaso(this.caso).subscribe(

        data => {

          if(data.status == 201) {

            if(data.body) {

              // Crear el caso
              this.caso = data.body;

            }

            this.displayRegistrarCaso = false;
            this.getPagosPendientesByIdUsuario(this.idUsuario);
            this.messageService.add({key: 'verPagosPendientesToast', severity:'success', summary: 'Éxito', detail: 'Caso registrado con éxito'});
          
          } else {

            this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al registrar el caso'});
    
          }

        }, error => {

          if(error.status == 404) {

            this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al registrar el caso, verifique los datos ingresados'});

          } else if(error.status == 400) {

            this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al registrar el caso'});

          } else if(error.status == 417) {

            this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al registrar el caso, este pago ya tiene un caso creado'});

          } else {

            this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al registrar el caso'});

          }

        }

      )

    }

  }

  seleccionarArchivoPago(event: any): void {

    this.archivoSeleccionadoPago = event.target.files;

  }

  seleccionarArchivoCaso(event: any): void {

    this.archivoSeleccionadoCaso = event.target.files;

  }

  subirArchivoPago(): void {

    if(this.archivoSeleccionadoPago) {

      const archivo: File | null = this.archivoSeleccionadoPago.item(0);

      if(archivo) {

        this.archivoActualPago = archivo;

        this.archivoService.subirArchivo(this.archivoActualPago).subscribe(

          data => {

            if(data.status == 200) {

              if(data.body) {
    
                // Cargar soporte del pago
                this.archivoPago = data.body;
    
              }

              this.pago.soporte = this.archivoPago.soporte;
              this.messageService.add({key: 'verPagosPendientesToast', severity:'success', summary: 'Éxito', detail: 'Archivo subido con éxito'});

            } else {

              this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al subir el archivo'});

            }

          }, error => {

            if(error.status == 400) {

              this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al subir el archivo'});
    
            } else {
    
              this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al subir el archivo'});
    
            }
    
          }

        );

      }

      this.archivoSeleccionadoPago = undefined;

    }    

  }

  subirArchivoCaso(): void {

    if(this.archivoSeleccionadoCaso) {

      const archivo: File | null = this.archivoSeleccionadoCaso.item(0);

      if(archivo) {

        this.archivoActualCaso = archivo;

        this.archivoService.subirArchivo(this.archivoActualCaso).subscribe(

          data => {

            if(data.status == 200) {

              if(data.body) {
    
                // Cargar soporte del caso
                this.archivoCaso = data.body;
    
              }

              this.caso.soporte = this.archivoCaso.soporte;
              this.messageService.add({key: 'verPagosPendientesToast', severity:'success', summary: 'Éxito', detail: 'Archivo subido con éxito'});

            } else {

              this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al subir el archivo'});

            }

          }, error => {

            if(error.status == 400) {

              this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al subir el archivo'});
    
            } else {
    
              this.messageService.add({key: 'verPagosPendientesToast', severity:'error', summary: 'Error', detail: 'Error al subir el archivo'});
    
            }
    
          }

        );

      }

      this.archivoSeleccionadoCaso = undefined;

    }    

  }

  ngOnInit(): void {

    this.idUsuario = Number(localStorage.getItem("idUsuario"));
    this.getPagosPendientesByIdUsuario(this.idUsuario);

  }

}