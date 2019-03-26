export class Vehicle{
    id: number;
    name: string;
    make: string;
    model: string;
    year: string;
    purchased: Date;

    editing: boolean = false;

    constructor(obj?: any){
        this.id = obj && obj.id || null;
        this.name = obj && obj.name || null;
        this.make = obj && obj.make || null;
        this.model = obj && obj.model || null;
        this.year = obj && obj.year || false;
        this.purchased = obj && obj.purchased || new Date();
    }
}