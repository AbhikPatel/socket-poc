import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public loader:BehaviorSubject<boolean>
  public api:string;
  constructor(
    private _http: HttpClient
  ) {
    this.loader = new BehaviorSubject(false);
    this.api = environment.baseURL
  }

  

  public postLogin(credentials:any):Observable<any>{
    return this._http.post<any>(`${this.api}/users/log-in`, credentials).pipe(
      map((res:any) => res)
    )
  }

  public isLoggedIn(): boolean{
    let token = localStorage.getItem('token')
    return token ? true: false;
  }
}
