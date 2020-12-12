export class User{
    userName: string;
    password: string;

    constructor(obj?: any){
        this.userName = obj && obj.userName || null;
        this.password = obj && obj.password || null;
    }
}