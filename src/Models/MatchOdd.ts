export class MatchOdd {
    matchId:number;
    competitors:string;
    sportName: string;
    countryName: string;
    matchDate:string;
    Oddfield:string;
    Oddvalue:string;

    constructor(matchId:number,competitors:string, sportName:string, countryName:string, matchDate:string, Oddfield:string,Oddvalue:string){
        this.matchId=matchId;
        this.competitors=competitors;
        this.sportName= sportName;
        this.countryName = countryName;
        this.matchDate = matchDate;
        this.Oddfield = Oddfield;
        this.Oddvalue = Oddvalue;
    }
}


