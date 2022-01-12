export class NuevoJugadorDto {
    nombres : string;
    apellidos : string;
    fechaNacimiento: string;
    fechaInscripcion : string;
    documento : string;
    idClub: number;

    constructor(nombres : string,apellidos : string, fechaNacimiento : string, fechaInscripcion : string, documento : string, idClub : number){
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.fechaNacimiento = fechaNacimiento;
        this.documento = documento;
        this.idClub = idClub;
        this.fechaInscripcion = fechaInscripcion;
    }
}
