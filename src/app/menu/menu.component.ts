import { Component, OnInit } from '@angular/core';
import { Country } from 'src/Models/Country';
import { League } from 'src/Models/League';
import { MatchFilter } from 'src/Models/MatchFilter';
import { Nullable } from 'src/Models/Nullable';
import { Sport } from 'src/Models/Sport';
import { DataStoreService } from 'src/Services/data-store.service';
import { MatchesFilterService } from 'src/Services/matches-filter.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  Sports = new Array<Sport>();
  public SelectedSport?: Sport;
  public SelectedCountry?: Country;
  public SelectedLeague?: League;

  constructor(
    private MatchesFilterService: MatchesFilterService,
    private DataStoreService: DataStoreService
  ) { }

  ngOnInit(): void {
    this.DataStoreService.getSports().subscribe((sports) => {
      this.Sports = sports;
    });
  }

  onSportClicked(sport: Sport) {
    if (this.SelectedSport?.id == sport.id) {
      this.SelectedSport = undefined;
    } else {
      this.SelectedSport = sport;
    }
    this.SelectedCountry = undefined;
    this.SelectedLeague = undefined;
    this.setFilter();
  }
  
  onCountryClicked(country: Country) {
    if (this.SelectedCountry?.name == country.name) {
      this.SelectedCountry = undefined;
    } else {
      this.SelectedCountry = country;
    }
    this.SelectedLeague = undefined;
    this.setFilter();
  }

  onLeagueClicked(league: League) {
    if (this.SelectedLeague?.id == league.id) {
      this.SelectedLeague = undefined;
    } else {
      this.SelectedLeague = league;
    }
    this.setFilter();
  }

  setFilter() {
    this.MatchesFilterService.setFilter(new MatchFilter(
      new Nullable(this.SelectedSport),
      new Nullable<Country>(this.SelectedCountry),
      new Nullable<League>(this.SelectedLeague))
    );
  }
}
