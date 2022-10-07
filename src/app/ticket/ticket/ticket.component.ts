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
          this.MatchOdds.push(match);
    }
    });
  }
  checkMatchBet(match: Match) {
    let check = new Boolean();
    check = true;
    this.MatchOdds.forEach(element => {
      if (element.matchId == match.id)
        check = false;
    });
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
    });
    return check
  }
  RemoveOdd(match: MatchOdd) {
    if(this.MatchOdds!=undefined)
    this.MatchOdds = this.MatchOdds.filter(x => x.matchId != match.matchId)
  }
}