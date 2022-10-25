import { Component, OnInit } from '@angular/core';
import { MatchesFilterService } from 'src/Services/matches-filter.service';
import { Selected } from 'src/Models/Selected';
import { Match } from 'src/Models/Match';
import { Odds } from 'src/Models/Odds';
import { MatchOdd } from 'src/Models/MatchOdd';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  SelectedMatch?: Selected;
  SelectedOdd?: Selected;
  MatchOdds=new Array<MatchOdd>();
  SelectedMatchOd!:MatchOdd;
  Matches = Array<Match>();
  Odds = Array<Odds>();
  Match!: Match;
  Odd!: Odds;
  oddsNumber:number=0;
  stake:number=1;
  totalCoeficient:number=1;
  possiblePaiment:number=1;
  totalCoeficientToPresent:string='0.00';
  possiblePaimentTopresent:string='0.00';
  constructor(
    private MatchesFilterService: MatchesFilterService,
  ) { }

  ngOnInit(): void {
    this.MatchesFilterService.getSelectedMatch().subscribe((match) => {
      this.Match = match.SelectedMatch!;
      this.Odd = match.SelectedOdd!;

    if (this.Match != undefined && 
        this.checkMatchBet(this.Match) &&
        this.Odd != undefined && 
        this.checkOdd(this.Odd)) {
        let match= new MatchOdd(          
        this.Match.id,this.Match.competitors, 
        this.Match.sportName,this.Match.countryName,
        this.Match.matchDate,this.Odd.field, this.Odd.value
        );
          {
          this.MatchOdds.push(match);
          
          this.totalCoeficient = this.totalCoeficient *  Number(this.Odd.value);
          this.totalCoeficientToPresent = this.totalCoeficient.toFixed(2);
          
          console.log(this.possiblePaiment);
          this.possiblePaiment = this.totalCoeficient * this.stake;
          this.possiblePaimentTopresent = this.possiblePaiment.toFixed(2);
        }
      }
    });
  }
  onChange(event:any){
    this.stake = event.target.value;

    this.possiblePaiment = this.totalCoeficient * this.stake;
    this.possiblePaimentTopresent = this.possiblePaiment.toFixed(2);
  }
  checkMatchBet(match: Match) {
    let check = new Boolean();
    check = true;
    this.MatchOdds.forEach(element => {
      if (element.matchId == match.id)
        check = false;
    });

    this.oddsNumber = this.MatchOdds.length + 1;
    return check;
  }
  checkOdd(odd: Odds) {
    let check = new Boolean();
    check = true;
    this.Odds.forEach(element => {
      if (element.alias == odd.alias &&
        element.marketId == odd.marketId &&
        element.description == odd.description &&
        element.field == odd.field &&
        element.value == odd.value
      ) {
        check = false;
      }
      this.oddsNumber = this.oddsNumber +1;
    });
    return check
  }
  removeOdd(match: MatchOdd) {
    if(this.MatchOdds!=undefined)
    this.MatchOdds = this.MatchOdds.filter(x => x.matchId != match.matchId);
    this.oddsNumber = this.oddsNumber - 1;
    if(this.MatchOdds.length>0){
      this.totalCoeficient = this.totalCoeficient / Number(match.Oddvalue);
      this.totalCoeficientToPresent = this.totalCoeficient.toFixed(2);

      this.possiblePaiment = this.totalCoeficient; // * ULOG
      this.possiblePaimentTopresent = this.possiblePaiment.toFixed(2);
    }
    else{    
      this.totalCoeficientToPresent = '0.00';
      this.possiblePaimentTopresent = '0.00';
    }
  }
  removeTicket(){
    this.MatchOdds.splice(0);
    this.oddsNumber = 0;
    this.totalCoeficient = 1;
    this.totalCoeficientToPresent = '0.00';
    this.possiblePaiment = 1;
    this.possiblePaimentTopresent = '0.00';
  }
}