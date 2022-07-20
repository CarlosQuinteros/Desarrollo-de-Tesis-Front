export class JuezRolDto {
    idPartido : number;
    idJuez : number;
    rol : string;

    constructor(idPartido : number, idJuez : number, rol : string) {
        this.idPartido = idPartido;
        this.idJuez = idJuez;
        this.rol = rol;
    }
}
