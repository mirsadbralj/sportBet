import { Component, OnInit } from '@angular/core';
import { Markets } from 'src/Models/Markets';
import { Match } from 'src/Models/Match';
import { MatchFilter } from 'src/Models/MatchFilter';
import { Odds } from 'src/Models/Odds';
import { SelectedMatch } from 'src/Models/SelectedItems';
import { DataStoreService } from 'src/Services/data-store.service';
import { MatchesFilterService } from 'src/Services/matches-filter.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  Filter?: MatchFilter;
  _SelectedMatch?: Match;
  SelectedMatch?: SelectedMatch;
  Matches = new Array<Match>();
  Markets = new Array<Markets>();
  _Odds = new Array<Odds>();
  headers = new Array<string>();
  constructor(
    private MatchesFilterService: MatchesFilterService,
    private DataStoreService: DataStoreService
  ) { }

  ngOnInit(): void {
    this.DataStoreService.getFiltered().subscribe((matches) => {
      this.Matches = matches;
    });

    this.MatchesFilterService.getFilter().subscribe((filter) => {
      this.Filter = filter;
      this.DataStoreService.filter(filter);
    });
  }

  OnMatchClicked(match: Match){
      this.SelectedMatch=new SelectedMatch(match.id);

      this.MatchesFilterService.setSelectedMatch(new SelectedMatch(match.id))
  }
  filterBasicBets(match: Match) {
    let odds = new Array<Odds>();
    let ordered = new Array<Odds>();
  
    match.markets[0].odds.forEach(element => {
      odds.push(element);
    });

    for (let index = 0; index < odds.length; index++) {
      if(odds[index].field=='1'){
        ordered[0]=odds[index];
      }
      else if(index==0)
      ordered[0]= new Odds(" ", " ", "   ", 0, 0," ");

      if(odds[index].field=='X'){
        ordered[1]=odds[index];
      }
      else if(index==1){
      ordered[1]= new Odds(" ", " ", "   ", 0, 0," ");
      }
      if(odds[index].field=='2'){
        ordered[2]=odds[index];
      }
      else if(index==2){
      ordered[2]= new Odds(" ", " ", "   ", 0, 0," ");
      }
      if(odds[index].field=='1X'){
        ordered[3]=odds[index];
      }
      else if(index==3){
       ordered[3]= new Odds(" ", " ", "   ", 0, 0," ");
      }
      if(odds[index].field=='X2'){
        ordered[4]=odds[index];
      }
      else if(index==4){
      ordered[4]= new Odds(" ", " ", "   ", 0, 0," ");
      }
      if(odds[index].field=='12'){
        ordered[5]=odds[index];
      }
      else if(index==5){
        ordered[5]= new Odds(" ", " ", "   ", 0, 0," ");
      }
    }
    //DO WITH PUSH(NEW ODDS()) LATER MOVE IT TO THE NEW FUNCTION INTO DATA STORE SERVICE 

    // let index:number;
    // match.markets.forEach(element => {
    //   element.odds.forEach(odd => {
    //     if (odd.marketId == 1) {
    //       odds.push(odd);
    //     }
    //   });
    // });

    this._Odds = ordered;

    return this._Odds;
  }
}
