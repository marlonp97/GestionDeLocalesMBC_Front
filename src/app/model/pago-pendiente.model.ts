export class PagoPendiente {

    constructor(
        public idPago: number,
        public descripcion: string,
        public precio: number,
        public fechaVencimiento: string,
        public valorPagado: number,
        public fechaPago: string,
        public tipoPago: string,
        public estadoPago: string,
        public local: string
        ) {}

}