import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Match } from 'src/Models/Match';
import { MatchFilter } from 'src/Models/MatchFilter';
import { SelectedMatch } from 'src/Models/SelectedItems';

@Injectable({
  providedIn: 'root'
})
export class MatchesFilterService {
  private MatchSubject = new Subject<Match>();
  private SelectedMatchSubject = new Subject<SelectedMatch>();
  private filterSubject = new Subject<MatchFilter>();

  constructor() { }

  setMatch(match: Match) {
    this.MatchSubject.next(match);
  }
  getMatch(): Observable<Match> {
    return this.MatchSubject.asObservable();
  }

  setSelectedMatch(match: SelectedMatch) {
    this.SelectedMatchSubject.next(match);
  }
  getSelectedMatch(): Observable<SelectedMatch> {
    return this.SelectedMatchSubject.asObservable();
  }

  setFilter(filter: MatchFilter) {
    this.filterSubject.next(filter);
  }

  getFilter(): Observable<MatchFilter> {
    return this.filterSubject.asObservable();
  }
}
