import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public api: string = 'http://172.16.3.107:21321/api/v1/users'
  public loader:BehaviorSubject<boolean>

  constructor(
    private _http: HttpClient
  ) {
    this.loader = new BehaviorSubject(false);
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
