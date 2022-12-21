import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatchOdd } from 'src/Models/MatchOdd';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() matchOdds: MatchOdd[] = [];
  @Input() width: string = " ";
  @Input() height: string = " ";
  @Input() maxWidth?: string;
  @Input() maxHeight?: string;
  @Output() onModalClose = new EventEmitter();
  @Output() onActionClick = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
