export class EditarUsuarioDto {
    nombre: string;
    apellido: string;
    email: string;
    nombreUsuario: string;
    roles: string[] = [];

    constructor (pNombre: string, pApellido: string, pEmail: string, pNombreUsuario: string,  pRoles: string[]){
        this.nombre = pNombre;
        this.apellido = pApellido;
        this.email = pEmail;
        this.nombreUsuario = pNombreUsuario;
        this.roles = pRoles;
    }
}
