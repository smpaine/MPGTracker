export class User{
    sessionId: string;
    userName: string;
    password: string;

    constructor(obj?: any){
        this.sessionId = obj && obj.sessionId || null;
        this.userName = obj && obj.userName || null;
        this.password = obj && obj.password || null;
    }
}