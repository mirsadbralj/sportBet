import { Component, OnInit } from '@angular/core';
import { MatchesFilterService } from 'src/Services/matches-filter.service';
import { Selected } from 'src/Models/Selected';
import { Match } from 'src/Models/Match';
import { Odds } from 'src/Models/Odds';
import { MatchOdd } from 'src/Models/MatchOdd';
import { ConfirmedTicketsStoreService } from 'src/Services/confirmed-tickets-store-service.service';
import { Ticket } from 'src/Models/Ticket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  SelectedMatch?: Selected;
  SelectedOdd?: Selected;
  MatchOdds = new Array<MatchOdd>();
  SelectedMatchOd!: MatchOdd;
  Matches = Array<Match>();
  Odds = Array<Odds>();
  showModal = false;
  Match!: Match;
  Odd!: Odds;
  oddsNumber: number = 0;
  stake: number = 1;
  totalCoeficient: number = 1;
  possiblePayment: number = 1;
  totalCoeficientToPresent: string = '0.00';
  possiblePaymentTopresent: string = '0.00';
  ticket = false;
  ticketNumber = 0;
  tickets: Ticket[] = [];
  constructor(
    private MatchesFilterService: MatchesFilterService,
    public confirmedTicketsService: ConfirmedTicketsStoreService
  ) { }

  ngOnInit(): void {
    this.MatchesFilterService.getSelectedMatch().subscribe((match) => {
      this.Match = match.SelectedMatch!;
      console.log(match.SelectedMatch);
      this.Odd = match.SelectedOdd!;
      console.log(match.SelectedOdd);
      if (this.Match != undefined &&
        this.checkMatchBet(this.Match) &&
        this.Odd != undefined &&
        this.checkOdd(this.Odd)) {
        let match = new MatchOdd(
          this.Match.id, this.Match.competitors,
          this.Match.sportName, this.Match.countryName,
          this.Match.matchDate, this.Odd.field, this.Odd.value, this.Odd.description
        );
        {
          this.MatchOdds.push(match);
          this.totalCoeficient = this.totalCoeficient * Number(this.Odd.value);
          this.totalCoeficientToPresent = this.totalCoeficient.toFixed(2);
          this.possiblePayment = this.totalCoeficient * this.stake;
          this.possiblePaymentTopresent = this.possiblePayment.toFixed(2);
        }
      }
      console.log(this.MatchOdds);
    });
  }

  onChange(event: any) {
    this.stake = event.target.value;
    if (this.oddsNumber > 0) {
      this.possiblePayment = this.totalCoeficient * this.stake;
      this.possiblePaymentTopresent = this.possiblePayment.toFixed(2);
    }
  }

  checkMatchBet(match: Match) {
    let check = new Boolean();
    check = true;
    this.MatchOdds.forEach(element => {
      if (element.matchId == match.id)
        check = false;
    });
    if (check) { this.oddsNumber = this.MatchOdds.length + 1; }
    return check;
  }

  checkOdd(odd: Odds) {
    let check = new Boolean();
    check = true;
    this.Odds.forEach(element => {
      if (element.alias == odd.alias &&
        element.marketId == odd.marketId &&
        element.description == odd.description &&
        element.field == odd.field &&
        element.value == odd.value
      ) {
        check = false;
      }
      this.oddsNumber = this.oddsNumber + 1;
    });
    return check
  }

  removeOdd(match: MatchOdd) {
    if (this.MatchOdds != undefined)
      this.MatchOdds = this.MatchOdds.filter(x => x.matchId != match.matchId);
    this.oddsNumber = this.oddsNumber - 1;
    if (this.MatchOdds.length > 0) {
      this.totalCoeficient = this.totalCoeficient / Number(match.Oddvalue);
      this.totalCoeficientToPresent = this.totalCoeficient.toFixed(2);
      this.possiblePayment = this.totalCoeficient * this.stake; // * ULOG
      this.possiblePaymentTopresent = this.possiblePayment.toFixed(2);
    }
    else {
      this.totalCoeficient = 1;
      this.possiblePayment = 0;
      this.totalCoeficientToPresent = '0.00';
      this.possiblePaymentTopresent = '0.00';
    }
  }

  onModalClose(event: any) {
    this.showModal = false;
  }

  ticketConfirm() {
    this.ticketNumber++;
    let matchOdd = this.MatchOdds;
    let ticket = {
      ticketId: this.ticketNumber,
      matchOdds: matchOdd,
      expanded: false,
      coefficient: this.totalCoeficientToPresent,
      numberOfMatches: this.oddsNumber,
      possiblePayment: this.possiblePaymentTopresent
    }
    this.tickets.push(ticket);
    this.confirmedTicketsService.confirmedTickets = this.tickets;
    this.showModal = false;
    this.removeTicket();
  }

  removeTicket() {
    this.MatchOdds = [];
    this.oddsNumber = 0;
    this.totalCoeficient = 1;
    this.totalCoeficientToPresent = '0.00';
    this.possiblePayment = 1;
    this.possiblePaymentTopresent = '0.00';
  }
}