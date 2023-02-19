import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public userName:BehaviorSubject<any>;
  constructor() { 
    this.userName = new BehaviorSubject('');
  }
}
