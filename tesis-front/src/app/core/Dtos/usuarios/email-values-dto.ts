export class EmailValuesDto {
    mailTo : string;
    userName: string;
    token: string;

    constructor(mailTo: string, userName: string, token: string){
        this.mailTo = mailTo;
        this.userName = userName;
        this.token = token;
    }
}
