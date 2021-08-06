export class CambiarPassword {
    passwordActual: string;
    passwordNuevo: string;
    repetirPassword: string;

    constructor(passwordActual: string, passwordNuevo: string, repetirPassword: string){
        this.passwordActual = passwordActual;
        this.passwordNuevo = passwordNuevo;
        this.repetirPassword = repetirPassword;
    }
    
}
