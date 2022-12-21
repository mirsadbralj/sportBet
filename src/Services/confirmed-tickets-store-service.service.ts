import { Injectable } from '@angular/core';
import { MatchOdd } from 'src/Models/MatchOdd';
import { Ticket } from 'src/Models/Ticket';

@Injectable({
  providedIn: 'root'
})

export class ConfirmedTicketsStoreService {
  public confirmedTickets: Ticket[]=[];

  constructor() { }
}
