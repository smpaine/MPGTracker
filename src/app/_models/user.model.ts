export class User{
    id: number;
    userName: string;
    password: string;
    userType: string;
    lastLoginDt: Date;

    constructor(obj?: any){
        this.id = obj && obj.id || null;
        this.userName = obj && obj.userName || null;
        this.password = obj && obj.password || null;
        this.userType = obj && obj.userType || 'regular';
        this.lastLoginDt = obj && obj.lastLoginDt || null;
    }
}