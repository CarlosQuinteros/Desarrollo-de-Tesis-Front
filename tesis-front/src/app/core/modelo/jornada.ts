import { Competencia } from "./competencia";

export class Jornada {

    id: number;
    numero: number;
    descripcion: string;
    competencia : Competencia;

    constructor(
        id: number,
        numero: number,
        descripcion: string,
        competencia: Competencia
    ){
        this.id = id;
        this.numero = numero;
        this.descripcion = descripcion;
        this.competencia = competencia;
    }
}
