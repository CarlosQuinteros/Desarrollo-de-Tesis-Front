export class JornadaDto {
    numero : number;
    descripcion : string;
    idCompetencia : number;

    constructor(numero : number, descripcion : string, idCompetencia : number){
        this.numero = numero;
        this.descripcion = descripcion;
        this.idCompetencia = idCompetencia;
    }
}
