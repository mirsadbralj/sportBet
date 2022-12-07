import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MatchesComponent } from './matches/matches.component';
import { DateComponent } from './date/date/date.component';
import { ElaborationComponent } from './elaboration/elaboration/elaboration.component';
import { TicketComponent } from './ticket/ticket/ticket.component';
import { CommonModule } from '@angular/common';
import { MenuArrowAnimation } from './menu/menu.animation';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
