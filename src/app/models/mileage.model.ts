export class Mileage{
    id: number;
    name: string;
    mileage: number;
    gallons: number;
    totalCost: number;
    timestamp: number;
    costPerGallon: number;
    mpg: number;
    miles: number;
    vid: number;
    costPerMile: number;

    constructor(obj?: any){
        this.id = obj && obj.id || null;
        this.name = obj && obj.name || null;
        this.mileage = obj && obj.mileage || null;
        this.gallons = obj && obj.gallons || null;
        this.totalCost = obj && obj.totalCost || null;
        this.timestamp = obj && obj.timestamp || null;
        this.costPerGallon = obj && obj.costPerGallon || null;
        this.mpg = obj && obj.mpg || null;
        this.miles = obj && obj.miles || null;
        this.vid = obj && obj.vid || null;
        this.costPerMile = obj && obj.costPerMile || null;
    }
}