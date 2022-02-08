export class Club {
    
    id : number = 0;
    alias: string;
    nombreClub: string;
    email: string;

    constructor(alias: string, nombreClub: string, email: string){
        this.alias = alias;
        this.nombreClub = nombreClub;
        this.email = email;
    }
}
