import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public userName: BehaviorSubject<any>;
  public api: string = 'http://172.16.3.107:21321/api/v1/users/'
  constructor(
    private _http: HttpClient
  ) {
    this.userName = new BehaviorSubject('');
    let user = localStorage.getItem('name')
    if (user)
      this.userName.next(user)
  }

  public getUsers(): Observable<any> {
    return this._http.get<any>(`${this.api}`)
  }

  public getValidUser(){
    let user;
    this.userName.subscribe((data) => user = data)
    return user ? true : false
  }
}
