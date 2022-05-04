export class Juez {
    id: number;
    documento: string;
    legajo: string;
    nombres: string;
    apellidos: string;

    constructor(id: number, nombres: string,apellidos:string, documento: string, legajo: string) {
        this.id = id;
        this.documento = documento;
        this.legajo = legajo;
        this.nombres = nombres;
        this.apellidos = apellidos;
    }
}
