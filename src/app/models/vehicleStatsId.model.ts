export class VehicleStatsId{
    vid: number;
    year: number;

    constructor(obj?: any){
        this.vid = obj && obj.vid || null;
        this.year = obj && obj.year || null;
    }
}