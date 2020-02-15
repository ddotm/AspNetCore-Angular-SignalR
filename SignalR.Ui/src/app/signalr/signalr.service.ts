import {EventEmitter, Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder} from '@aspnet/signalr';
import {SignalrConfig} from './signalr-config';
import {SignalrMessage} from './signalr-message.model';
import {SignalrMsgType} from './signalr-msg-type';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  messageReceived = new EventEmitter<SignalrMessage>();
  connectionEstablished = new EventEmitter<boolean>();

  private connectionIsEstablished = false;
  private _hubConnection: HubConnection;
  private connectionAttemptCount: number = 0;
  private maxConnectionAttempts: number = 3;

  constructor() {
  }

  public startSignalR() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  public stopSignalR() {
    this._hubConnection.stop();
  }

  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(SignalrConfig.baseUrl + SignalrConfig.route)
      .build();
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on(SignalrMsgType.msgReceived, (data: SignalrMessage) => {
      this.messageReceived.emit(data);
    });
  }

  private startConnection(): void {
    this.connectionAttemptCount++;
    this._hubConnection
        .start()
        .then(() => {
          this.connectionIsEstablished = true;
          this.connectionAttemptCount = 0;
          console.log('Hub connection started');
          this.connectionEstablished.emit(true);
        })
        .catch(err => {
          console.log('Error while establishing connection, retrying...');
          if (this.connectionAttemptCount >= this.maxConnectionAttempts) {
            console.log('Max number of connection attempts exceeded. No more retries.');
            return;
          }
          setTimeout(() => {
            this.startConnection();
          }, 5000);
        });
  }
}
