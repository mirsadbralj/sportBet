import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/Models/Ticket';
import { ConfirmedTicketsStoreService } from 'src/Services/confirmed-tickets-store-service.service';
import { MenuArrowAnimation } from '../menu/menu.animation';

@Component({
  selector: 'app-confirmed-tickets',
  templateUrl: './confirmed-tickets.component.html',
  styleUrls: ['./confirmed-tickets.component.scss'],
  animations: [MenuArrowAnimation]
})
export class ConfirmedTicketsComponent implements OnInit {
  selectedTicket?: Ticket;
  tickets: Ticket[] = [];

  constructor(public confirmedTicketsSerivce: ConfirmedTicketsStoreService) {
  }

  ngOnInit(): void {
    this.tickets = this.confirmedTicketsSerivce.confirmedTickets;
    console.log(this.tickets);
  }

  onTicketClicked(ticket: Ticket) {
    if (this.selectedTicket?.ticketId == ticket.ticketId) {
      this.selectedTicket.expanded = false;
      this.selectedTicket = undefined;
    } 
    else {
      this.tickets.forEach(t=>{
        if(t.ticketId == ticket.ticketId){
          t.expanded = true;
          ticket = t;
        }
        else { t.expanded = false; }   
      });
      this.selectedTicket = ticket;
      this.selectedTicket.expanded = ticket.expanded;
    }
  }

}
