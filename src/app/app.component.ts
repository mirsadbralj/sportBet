import { Component } from '@angular/core';
import { Match } from "../Models/Match";
import { DataStoreService } from 'src/Services/data-store.service';
import { WebSocketService } from 'src/Services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SportBet';

  constructor(
    private WebSocketService: WebSocketService,
    private DataStoreService: DataStoreService
  ) {
  }

  ngOnInit() {
    this.WebSocketService.listen("fullOffer").subscribe((data) => {
      this.DataStoreService.set(data as Array<Match>);
    })

    this.WebSocketService.listen("insert").subscribe((data) => {
      this.DataStoreService.insert(data as Array<Match>);
    })

    this.WebSocketService.listen("update").subscribe((data) => {
      this.DataStoreService.update(data as Array<Match>);
    })

    this.WebSocketService.listen("delete").subscribe((data) => {
      this.DataStoreService.delete(data as Array<Match>);
    })
  }
}
