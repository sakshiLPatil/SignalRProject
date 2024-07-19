import { Injectable } from '@angular/core';
import { ChartModel } from '../ChartModel.model';
import * as signalR from "@microsoft/signalr"

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public data: ChartModel[] = [];
  constructor() { }

 
  private hubConnection: signalR.HubConnection | any;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7233/api/chart')
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err:any) => console.log('Error while starting connection: ' + err))
  }

  public addTransferChartDataListener = () => {
    this.hubConnection.on('transferchartdata', (data:any) => {
      this.data = data;
      console.log(data);
    });
  }
}
