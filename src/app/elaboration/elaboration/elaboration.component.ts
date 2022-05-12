import { Component, OnInit } from '@angular/core';
import { Markets } from 'src/Models/Markets';
import { Match } from 'src/Models/Match';
import { Odds } from 'src/Models/Odds';
import { Selected } from 'src/Models/Selected';
import { DataStoreService } from 'src/Services/data-store.service';
import { MatchesFilterService } from 'src/Services/matches-filter.service';

@Component({
  selector: 'app-elaboration',
  templateUrl: './elaboration.component.html',
  styleUrls: ['./elaboration.component.css']
})

export class ElaborationComponent implements OnInit {
  Markets = new Array<Markets>();
  Matches = new Array<Match>();
  Match?: Match;
  SelectedMatch?: Selected;
  SelectedOdd?: Selected;
  MatchMarkets?: Array<Markets>;
  constructor(
    private MatchesFilterService: MatchesFilterService,
    private DataStoreService: DataStoreService
  ) { }

  ngOnInit(): void {
    this.DataStoreService.getMarkets().subscribe((markets) => {
      this.Markets = markets;
    });
    this.DataStoreService.getFiltered().subscribe((matches) => {
      this.Matches = matches;
    });
    this.MatchesFilterService.getSelectedMatch().subscribe((match) => {
      this.SelectedMatch = match;
      this.SelectedOdd = match;
      this.Match = this.Matches.find(x => x == this.SelectedMatch?.SelectedMatch)
      this.loadMarkets();
    });
  }

  OnButtonClicked(odd: Odds) {
    this.SelectedOdd = new Selected(this.SelectedMatch?.SelectedMatch, odd);
    this.MatchesFilterService.setSelectedOdd(new Selected(this.SelectedMatch?.SelectedMatch, this.SelectedOdd?.SelectedOdd))
  }

  loadMarkets() {
    let markets = new Array<Markets>();
    this.Match?.markets.forEach(element => {
      markets.push(element);
    });
    this.Markets = markets;
    return this.Markets;
  }
}
