import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public api: string = 'http://172.16.3.107:21321/api/v1/users'
  public loader:Subject<boolean>

  constructor(
    private _http: HttpClient
  ) {
    this.loader = new Subject();
  }

  public getUsers(): Observable<any> {
    return this._http.get<any>(`${this.api}`).pipe(
      map((res:any) => res.data.doc)
    )
  }

  public getChatUsers(id:string): Observable<any> {
    return this._http.get<any>(`${this.api}/${id}`).pipe(
      map((res:any) => res.data.doc.chats)
    )
  }

  public postLogin(credentials:any):Observable<any>{
    return this._http.post<any>(`${this.api}/log-in`, credentials).pipe(
      map((res:any) => res)
    )
  }

  public isLoggedIn(): boolean{
    let token = localStorage.getItem('token')
    return token ? true: false;
  }
}
