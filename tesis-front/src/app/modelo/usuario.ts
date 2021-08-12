export class Usuario {
    id?: number;
    nombre: string;
    apellido: string;
    email: string;
    nombreUsuario: string;
    password: string;
    authorities:string[] = [];
    activo:boolean = false;
    fechaCreacion:Date = new Date();
    fechaActualizacion:Date = new Date();
    tokenPassword: string = '';


    constructor(nombre: string,apellido: string,email:string, nombreUsuario:string,password: string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.nombreUsuario = nombreUsuario;
        this.password = password;
    }

}
