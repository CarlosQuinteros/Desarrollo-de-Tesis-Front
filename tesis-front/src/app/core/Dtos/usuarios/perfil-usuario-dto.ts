export class PerfilUsuarioDto {
    nombre: string;
    apellido: string;
    email : string;
    nombreUsuario : string;

    constructor(nombre: string, apellido: string, email: string, nombreUsuario: string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.nombreUsuario = nombreUsuario;
    }
}
