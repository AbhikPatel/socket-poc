import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  // socket = io('wss://anonychat.onrender.com')
  socket = io('ws://172.16.3.107:21321');
  public getId:any;
  public api:string = 'http://172.16.3.107:21321/api/v1'

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

  public getMessages(chatId:string):Observable<any>{
    return this._http.get<any>(`${this.api}/messages/?chat=${chatId}`)
  }

  public getUsers(): Observable<any> {
    return this._http.get<any>(`${this.api}/users`).pipe(
      map((res:any) => res.data.doc)
    )
  }

  public getChatUsers(id:string): Observable<any> {
    return this._http.get<any>(`${this.api}/users/${id}`).pipe(
      map((res:any) => res.data.doc.chats)
    )
  }

  public postChat(chat:any):Observable<any>{
    return this._http.post<any>(`${this.api}/chats`, chat).pipe(
      map((res:any) => res.data.doc._id)
    )
  }
}
