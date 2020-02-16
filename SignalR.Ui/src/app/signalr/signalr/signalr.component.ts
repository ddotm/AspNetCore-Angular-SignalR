import {ChangeDetectionStrategy, Component, NgZone, OnInit} from '@angular/core';
import _ from 'lodash';
import {SignalrMessage} from '../signalr-message.model';
import {SignalrService} from '../signalr.service';

@Component({
  selector: 'dlm-signalr',
  templateUrl: './signalr.component.html',
  styleUrls: ['./signalr.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SignalrComponent implements OnInit {

  private uniqueClientId: string = new Date().getTime()
                                             .toString(10);
  public userName: string;
  public msg: string;
  public messages: Array<SignalrMessage> = new Array<SignalrMessage>();

  constructor(public signalrService: SignalrService,
              private _ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.signalrService.startSignalR();
    this.subscribeToEvents();
  }

  public send() {
    if (!this.dataReadyForSend()) {
      return;
    }

    const message: SignalrMessage = new SignalrMessage();
    message.clientId = this.uniqueClientId;
    message.messageId = new Date().getTime()
                                  .toString(10);
    message.userName = this.userName;
    message.type = 'send';
    message.contents = this.msg;
    message.timestamp = new Date();
    this.messages.push(message);
    this.signalrService.sendMsg(message);
    this.msg = '';
  }

  public msgKeyup($event: KeyboardEvent) {
    if ($event.key === 'Enter') {
      this.send();
    }
  }

  public dataReadyForSend(): boolean {
    return !_.isEmpty(this.userName) && !_.isEmpty(this.msg);
  }

  private subscribeToEvents(): void {
    this.signalrService.msg$.subscribe((message: SignalrMessage) => {
      this._ngZone.run(() => {
        if (_.isEmpty(message) || _.isEmpty(message.messageId) || message.clientId === this.uniqueClientId) {
          return;
        }
        message.type = 'received';
        this.messages.push(message);
      });
    });
  }
}
