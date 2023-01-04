export class Pago {

    constructor(
        public idPago: number,
        public descripcion: string,
        public precio: number,
        public fechaVencimiento: string,
        public soporte: string,
        public valorPagado: number,
        public fechaPago: string,
        public tipoPago: {
            idTipoPago: number,
            tipo: string
        },
        public estadoPago: {
            idEstadoPago: number,
            estado: string
        },
        public usuarioPago: {
            idUsuario: number,
            correo: string
        },
        public empresaPago: {
            idEmpresa: number,
            nombre: string
        },
        public localPago: {
            idLocal: number,
            direccion: string
        }
        ) {}

}