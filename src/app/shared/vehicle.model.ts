export class Vehicle{
    id: number;
    name: string;
    description: string;
    editing: boolean = false;
    imageUrl: string;
    contractTypeId: number;
    isActive: boolean;
    contractSignedOn: Date;
    budget: number;
    originalVehicle: Vehicle;

    constructor(obj?: any){
        this.id = obj && obj.id || null;
        this.name = obj && obj.name || null;
        this.description = obj && obj.description || null;
        this.contractTypeId = obj && obj.contractTypeId || null;
        this.isActive = obj && obj.isActive || false;
        this.contractSignedOn = obj && obj.contractSignedOn || new Date();
        this.budget = obj && obj.budget || 0;
        this.imageUrl = "http://placehold.it/500x300/e4d2ba";
    }
}