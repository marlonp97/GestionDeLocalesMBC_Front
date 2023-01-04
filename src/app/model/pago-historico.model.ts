export class PagoHistorico {

    constructor(
        public idPago: number,
        public descripcion: string,
        public precio: number,
        public fechaVencimiento: string,
        public soporte: string,
        public valorPagado: number,
        public fechaPago: string,
        public tipoPago: string,
        public local: string
        ) {}

}