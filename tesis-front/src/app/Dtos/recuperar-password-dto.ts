export class RecuperarPasswordDto {
    password: string;
    confirmarPassword: string;
    tokenPassword: string;

    constructor (password: string, confirmarPassword: string, tokenPassword: string) {
        this.password = password;
        this.confirmarPassword = confirmarPassword;
        this.tokenPassword = tokenPassword;
    }
}
