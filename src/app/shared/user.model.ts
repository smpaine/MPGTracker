export class User{
    token: string;
    userName: string;
    password: string;

    constructor(obj?: any){
        this.token = obj && obj.token || null;
        this.userName = obj && obj.userName || null;
        this.password = obj && obj.password || null;
    }
}