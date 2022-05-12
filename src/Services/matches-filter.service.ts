import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Match } from 'src/Models/Match';
import { MatchFilter } from 'src/Models/MatchFilter';
import { Selected } from 'src/Models/Selected';

@Injectable({
  providedIn: 'root'
})
export class MatchesFilterService {
  private SelectedMatchSubject = new Subject<Selected>();
  private filterSubject = new Subject<MatchFilter>();

  constructor() { }
  setSelectedMatch(match: Selected) {
    this.SelectedMatchSubject.next(match);
  }
  getSelectedMatch(): Observable<Selected> {
    return this.SelectedMatchSubject.asObservable();
  }

  setSelectedOdd(match: Selected) {
    this.SelectedMatchSubject.next(match);
  }
  getSelectedsetSelectedOddMatch(): Observable<Selected> {
    return this.SelectedMatchSubject.asObservable();
  }

  setFilter(filter: MatchFilter) {
    this.filterSubject.next(filter);
  }

  getFilter(): Observable<MatchFilter> {
    return this.filterSubject.asObservable();
  }
}
