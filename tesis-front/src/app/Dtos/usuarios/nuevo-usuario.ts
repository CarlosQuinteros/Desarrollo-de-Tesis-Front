export class NuevoUsuario {

    nombre: string;
    apellido: string;
    email: string;
    nombreUsuario: string;
    password: string;
    roles: string[] = [];


    constructor (pNombre: string, pApellido: string, pEmail: string, pNombreUsuario: string, pPassword: string, pRoles: string[]){
        this.nombre = pNombre;
        this.apellido = pApellido;
        this.email = pEmail;
        this.nombreUsuario = pNombreUsuario;
        this.password = pPassword;
        this.roles = pRoles;
    }
}
