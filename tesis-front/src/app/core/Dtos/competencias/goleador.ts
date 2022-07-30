export class Goleador {
    apellidos: string;
    nombre: string;
    nombreClub: string;
    goles : number;

    constructor(apellidos: string, nombre: string, nombreClub: string, goles: number) {
        this.apellidos = apellidos;
        this.nombre = nombre;
        this.nombreClub = nombreClub;
        this.goles = goles;
    }

}
