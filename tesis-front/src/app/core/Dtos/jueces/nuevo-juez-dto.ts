export class NuevoJuezDto {
    documento: string;
    legajo: string;
    nombres: string;
    apellidos: string;

    constructor(nombres: string,apellidos:string,documento: string, legajo: string) {
        this.documento = documento;
        this.legajo = legajo;
        this.nombres = nombres;
        this.apellidos = apellidos;
    }
}
