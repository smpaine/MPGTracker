import { VehicleStatsId } from "./vehicleStatsId.model";

export class VehicleStats{
    vid: number;
    year: number;
    gallons: number;
    totalCost: number;
    costPerGallon: number;
    costPerMile: number;
    mpg: number;
    miles: number;
    id: VehicleStatsId;

    constructor(obj?: any){
        this.vid = obj && obj.vid || null;
        this.year = obj && obj.year || null;
        this.gallons = obj && obj.gallons || null;
        this.totalCost = obj && obj.totalCost || null;
        this.costPerGallon = obj && obj.costPerGallon || null;
        this.costPerMile = obj && obj.costPerMile || null;
        this.mpg = obj && obj.mpg || null;
        this.miles = obj && obj.miles || null;
        this.id = obj && obj.id || null;
    }
}