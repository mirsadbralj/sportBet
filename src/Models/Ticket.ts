import { MatchOdd } from "./MatchOdd";

export class Ticket {
    ticketId: number;
    matchOdds: MatchOdd[];
    expanded = false;
    coefficient: string = "";
    numberOfMatches: number = 0;
    possiblePayment: string = "";
    constructor(ticketId: number, matchOdss: MatchOdd[]) {
        this.ticketId = ticketId,
            this.matchOdds = matchOdss
    }
}