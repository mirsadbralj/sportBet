import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Country } from 'src/Models/Country';
import { League } from 'src/Models/League';
import { MatchFilter } from 'src/Models/MatchFilter';
import { Nullable } from 'src/Models/Nullable';
import { Sport } from 'src/Models/Sport';
import { DataStoreService } from 'src/Services/data-store.service';
import { MatchesFilterService } from 'src/Services/matches-filter.service';
import { MenuArrowAnimation } from './menu.animation';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [MenuArrowAnimation],
  encapsulation: ViewEncapsulation.None,
})

export class MenuComponent implements OnInit {
  Sports = new Array<Sport>();
  public SelectedSport?: Sport;
  public SelectedCountry?: Country;
  public SelectedLeague?: League;
  isMenuOpen: boolean = false;
  clickedSport!: Sport;
  clickedCountry!: Country;
  constructor(
    private MatchesFilterService: MatchesFilterService,
    private DataStoreService: DataStoreService
  ) { }

  ngOnInit(): void {
    this.DataStoreService.getSports().subscribe((sports) => {
      this.Sports = sports;
      this.Sports.forEach(s=>{
        if(this.clickedSport && s.id == this.clickedSport.id){
          s.expanded = this.clickedSport.expanded;
          if(s.id == this.clickedSport.id){
            s.countries.forEach(c=>{
              if(this.clickedCountry && c.name == this.clickedCountry.name){
                c.expanded = this.clickedCountry.expanded;
              }
            });
          }
        }
      })
    });
  }
  
  onSportClicked(sport: Sport) {
    sport.expanded = !sport.expanded;
    this.clickedSport = sport;
    this.Sports.forEach(s=> {
      if(s.id == sport.id){
        s.expanded = sport.expanded;
      }
      else{
        s.expanded = false;
      }
    });
    this.isMenuOpen = !this.isMenuOpen;

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
    this.clickedCountry = country;
    this.Sports.forEach(s => {
      if(s.id == this.clickedSport.id){
        s.countries.forEach(c=>{
          if(c.name == country.name){
            c.expanded = !country.expanded;
            this.clickedCountry = c;
          }
          else{
            c.expanded = false;
          }
        });
      }
    });
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
