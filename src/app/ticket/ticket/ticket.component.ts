import { Component, OnInit } from '@angular/core';
import { MatchesFilterService } from 'src/Services/matches-filter.service';
import { Selected } from 'src/Models/Selected';
import { Match } from 'src/Models/Match';
import { Odds } from 'src/Models/Odds';
import { DataStoreService } from 'src/Services/data-store.service';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  SelectedMatch?: Selected;
  SelectedOdd?: Selected;
  Matches = Array<Match>();
  Odds = Array<Odds>();
  Match!: Match;
  Odd!:Odds;
  constructor(
    private DataStoreService:DataStoreService,
    private MatchesFilterService: MatchesFilterService,
  ) { }

  ngOnInit(): void {
    this.DataStoreService.getFiltered().subscribe((matches) => {
      this.Matches = matches;
    });

    this.MatchesFilterService.getSelectedMatch().subscribe((match) => {
      this.Match = match.SelectedMatch!;
      this.Odd = match.SelectedOdd!;

      this.Matches.push(this.Match)
      this.Odds.push(this.Odd);
      // this.Matches.push(new Match(this.SelectedMatch.SelectedMatch));
      console.log(this.SelectedMatch);

    });
  }

}
