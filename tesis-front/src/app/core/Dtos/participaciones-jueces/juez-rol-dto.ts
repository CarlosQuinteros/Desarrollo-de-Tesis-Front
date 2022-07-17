export class JuezRolDto {
    idPartido : number;
    idJuez : number;
    roles : string;

    constructor(idPartido : number, idJuez : number, roles : string) {
        this.idPartido = idPartido;
        this.idJuez = idJuez;
        this.roles = roles;
    }
}
