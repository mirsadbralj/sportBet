import { Odds } from "./Odds";

export class Selected {
    public SelectedMatchId?: number;
    public SelectedOdd?: Odds;

    constructor(id?:number , Odd?:Odds) {
        this.SelectedMatchId = id;
        this.SelectedOdd = Odd;

    }
}