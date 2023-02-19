import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket = io('wss://anonychat.onrender.com')
  // socket = io('ws://172.16.3.107:21321')
  
  constructor() {
    
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
}
