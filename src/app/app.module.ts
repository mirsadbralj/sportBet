import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MatchesComponent } from './matches/matches.component';
import { DateComponent } from './date/date/date.component';
import { ElaborationComponent } from './elaboration/elaboration/elaboration.component';
import { TicketComponent } from './ticket/ticket/ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MatchesComponent,
    DateComponent,
    ElaborationComponent,
    TicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
