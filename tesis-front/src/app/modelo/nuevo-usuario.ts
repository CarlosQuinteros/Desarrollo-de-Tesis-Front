export class NuevoUsuario {
    nombre: string;
    apellido: string;
    email: string;
    nombreUsuario: string;
    password: string;
    authorities:string[] = [];

    constructor(nombre: string,apellido: string,email:string, nombreUsuario:string,password: string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.nombreUsuario = nombreUsuario;
        this.password = password;
    }

}
