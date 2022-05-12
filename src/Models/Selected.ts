import { Match } from "./Match";
import { Odds } from "./Odds";

export class Selected {
    public SelectedMatch?: Match;
    public SelectedOdd?: Odds;

    constructor(match?:Match , Odd?:Odds) {
        this.SelectedMatch = match;
        this.SelectedOdd = Odd;

    }
}