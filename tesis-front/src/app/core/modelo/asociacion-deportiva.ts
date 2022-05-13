export class AsociacionDeportiva {
    
    id: number;
    nombre: string;
    email: string;
    alias: string;

    constructor(id: number, nombre: string, email : string, alias: string) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.alias = alias;
    }
}
