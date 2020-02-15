import {Component, OnInit} from '@angular/core';
import {SignalrService} from '../signalr.service';

@Component({
  selector: 'dlm-signalr',
  templateUrl: './signalr.component.html',
  styleUrls: ['./signalr.component.scss']
})
export class SignalrComponent implements OnInit {

  constructor(public signalrService: SignalrService) {
  }

  ngOnInit(): void {
    this.signalrService.startSignalR();
  }

}
