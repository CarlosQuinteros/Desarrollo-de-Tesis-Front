export class NuevoClubDto {
    alias: string;
    nombre: string;
    email: string;

    constructor(alias: string, nombre: string, email: string){
        this.alias = alias;
        this.nombre = nombre;
        this.email = email;
    }
}
