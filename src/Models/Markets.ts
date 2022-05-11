import { Odds } from "./Odds";

export class Markets {
    code: string;
    competitors: string;
    description: string
    forbiddenToCombine: string;
    id: number;
    isMain: boolean;
    maxPayin: number;
    minCombinations: number;
    name: string;
    order: number
    validations: string;
    public odds= new Array<Odds>();

    constructor(Code: string, Competitors: string, description: string, ForrbidenToCom: string, id: number, isMain: boolean, maxPayin: number, minCombinations: number, Name: string, Order: number, Validations: string, Odds:Array<Odds>) {
        this.code = Code;
        this.competitors = Competitors;
        this.description = description;
        this.forbiddenToCombine = ForrbidenToCom;
        this.id = id,
        this.isMain = isMain;
        this.maxPayin = maxPayin;
        this.minCombinations = minCombinations;
        this.name = Name;
        this.order = Order;
        this.validations = Validations;
        this.odds= Odds;
    }
}