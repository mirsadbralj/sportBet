import { Component, OnInit } from '@angular/core';
import { DataStoreService } from 'src/Services/data-store.service';
import { MatchesFilterService } from 'src/Services/matches-filter.service';
import { Match } from 'src/Models/Match';
import { DateTime } from 'src/Models/Date';
import { MatchFilter } from 'src/Models/MatchFilter';
import { Sport } from 'src/Models/Sport';
import { Nullable } from 'src/Models/Nullable';
import { ConfirmedTicketsStoreService } from 'src/Services/confirmed-tickets-store-service.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {
  // public selectedItems?: SelectedItems;
  Dates = new Array<DateTime>();
  Sports = new Array<Sport>();
  Matches = new Array<Match>();
  showModal = false;
  public SelectedDate?:DateTime;

  constructor(
    private MatchesFilterService: MatchesFilterService,
    private DataStoreService: DataStoreService,
    public confirmationService: ConfirmedTicketsStoreService
  ) { }

  ngOnInit(): void {
    this.DataStoreService.getDates().subscribe((dates) => {
      this.Dates = dates;
    });

    this.DataStoreService.getSports().subscribe((sports) => {
      this.Sports = sports;
    });
  }
  onModalClose(event:any){
    this.showModal = false;
  }
  OnDateButtonClicked(date:DateTime){
    
    this.SelectedDate=date;

    this.MatchesFilterService.setFilter(new MatchFilter(undefined,undefined, undefined, new Nullable(this.SelectedDate)));
  }
}
