export class AsociacionDeportivaDto {

    nombre : string;
    email: string;
    alias: string;

    constructor(nombre : string, email : string, alias : string){
        this.nombre = nombre;
        this.email = email;
        this.alias = alias;
    }
}
