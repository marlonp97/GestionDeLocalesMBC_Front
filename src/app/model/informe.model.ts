export class Informe {

    constructor(
        public idPago: number,
        public descripcion: string,
        public precio: number,
        public fechaVencimiento: string,
        public soporte: string,
        public valorPagado: number,
        public fechaPago: string,
        public tipoPago: string,
        public local: string,
        public empresa: string,
        public usuario: string
        ) {}

}