import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  // socket = io('wss://anonychat.onrender.com')
  socket = io('ws://172.16.3.107:21321');
  public getId:any;
  public api:string = 'http://172.16.3.107:21321/api/v1/messages/'

  constructor(
    private _http:HttpClient
  ) {
  }
  
  listen(eventname: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventname, (data:any) => {
        subscriber.next(data);
      })
    })
  }
  
  emit(eventname: string, data: any) {
    this.socket.emit(eventname, data);
  }

  public getMessages(sender:any, receiver:any):Observable<any>{
    return this._http.get<any>(`${this.api}?sender=${sender}&receiver=${receiver}`)
  }
}
