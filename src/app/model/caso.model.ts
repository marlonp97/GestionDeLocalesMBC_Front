export class Caso {

    constructor(
        public idCaso: number,
        public descripcion: string,
        public soporte: string,
        public estadoCaso: string,
        public usuario: string,
        public pagoCaso: {
            idPago: number,
            descripcion: string
        },
        public empresa: string,
        public local: string
        ) {}

}