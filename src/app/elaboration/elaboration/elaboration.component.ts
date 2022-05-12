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
      console.log(this.SelectedOdd);
      this.Match = this.Matches.find(x => x.id == this.SelectedMatch?.SelectedMatchId)
      this.loadMarkets();
    });
  }

  loadMarkets() {
    let markets = new Array<Markets>();
    this.Match?.markets.forEach(element => {
      markets.push(element);
    });
    this.Markets = markets;
    return this.Markets;
  }

  toggle = true;
  status = 'Enable'; 

  enableDisableRule() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Enable' : 'Disable';
  }


}
