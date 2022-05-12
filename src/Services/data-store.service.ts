import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatchFilter } from '../Models/MatchFilter';
import { Country } from '../Models/Country';
import { League } from '../Models/League';
import { Match } from '../Models/Match';
import { Orderable } from '../Models/Orderable';
import { Sport } from '../Models/Sport';
import { DateTime } from 'src/Models/Date';
import { Market } from 'src/Models/Market';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private lastFilter = new MatchFilter();
  private data = new Array<Match>();
  private sportsSubject = new Subject<Array<Sport>>();
  private DateSubject = new Subject<Array<DateTime>>();
  private MarketSubject = new Subject<Array<Market>>();
  private filteredDataSubject = new Subject<Array<Match>>();

  constructor() { }

  set(data: Array<Match>) {
    this.data = data;
    this.sportsSubject.next(this.generateSports());
    this.DateSubject.next(this.generateDates());
    this.MarketSubject.next(this.generateMarket());
  }

  insert(data: Array<Match>) {
    this.data = this.data.concat(data);
    this.sportsSubject.next(this.generateSports());
    this.DateSubject.next(this.generateDates());
    this.MarketSubject.next(this.generateMarket());
    if (this.lastFilter) {
      this.filter(this.lastFilter);
    }
  }

  update(data: Array<Match>) {
    this.data.forEach(element => {
      data.forEach(el=> {
        if(element.id==el.id)
        element=el;
      });
    });
  }

  delete(data: Array<Match>) {
      data.forEach(el=> {
        this.data = this.data.filter(x=> x.id != el.id);
      });
  }

  filter(filter: MatchFilter) {


    if (filter.country == null)
      filter.country = this.lastFilter.country;

    if (filter.sport == null)
      filter.sport = this.lastFilter.sport;

    if (filter.league == null)
      filter.league = this.lastFilter.league;

    this.lastFilter = filter;

    let filtered = this.data;

    if (filter.sport?.value) {
      filtered = filtered.filter((match) => match.sportId == filter.sport?.value?.id);
    }

    if (filter.country?.value) {
      filtered = filtered.filter((match) => match.countryName == filter.country?.value?.name);
    }

    if (filter.league?.value) {
      filtered = filtered.filter((match) => match.leagueId == filter.league?.value?.id);
    }

    if (filter.date?.value) {
      filtered = filtered.filter((match) => match.matchDate && filter.date?.value?.equalsDate(match.matchDate));
    }

    this.filteredDataSubject.next(filtered);
  }

  getFiltered(): Observable<Array<Match>> {
    return this.filteredDataSubject.asObservable();
  }
  getSports(): Observable<Array<Sport>> {
    return this.sportsSubject.asObservable();
  }

  getDates(): Observable<Array<DateTime>> {
    return this.DateSubject.asObservable();
  }

  getMarkets(): Observable<Array<Market>> {
    return this.MarketSubject.asObservable();
  }

  private sort(items: Array<Orderable>) {
    items.sort((a, b) => {
      if (a.order < b.order)
        return -1;

      if (a.order > b.order)
        return 1;

      return 0;
    });
  }

  private generateMarket() {
    const markets = Array<Market>();

    this.data.forEach(element => {
      element.markets.forEach(el => {
        markets.push(el);
      });
    });

    return markets;
  }

  private generateDates() {
    const dates = Array<DateTime>();
    this.data.forEach((match: Match) => {
      let Day = new Date(Date.parse(match.matchDate));
      var date2 = new DateTime(Day.getFullYear(), Day.getMonth() + 1, Day.getDate());
      var date1 = dates.find(d => d.day == date2.day
        && d.month == date2.month
        && d.year == date2.year);

      if (!date1) {
        date1 = new DateTime(date2.year, date2.month, date2.day);
        date1.date = new Date(Day);
        dates.push(date1);
      }
    })

    dates.sort(function (a, b) {
      var dateA = new Date(a.date!).getTime();
      var dateB = new Date(b.date!).getTime();
      return dateA > dateB ? 1 : -1;
    });

    return dates;
  }

  private generateSports() {
    const sports = Array<Sport>();

    this.data.forEach((match: Match) => {
      var sport = sports.find(s => s.id == match.sportId);
      if (!sport) {
        sport = new Sport(match.sportId, match.sportName, match.sportOrder, []);
        sports.push(sport);
        this.sort(sports);
      }

      var country = sport.countries.find(c => c.name == match.countryName);
      if (!country) {
        country = new Country(match.countryName, match.countryOrder, []);
        sport.countries.push(country);
        this.sort(sport.countries);
      }

      var league = country.leagues.find(l => l.id == match.leagueId);
      if (!league) {
        league = new League(match.leagueId, match.leagueName, match.leagueOrder);
        country.leagues.push(league);
        this.sort(country.leagues);
      }
    });

    return sports;
  }
}
