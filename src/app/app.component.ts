import { Component } from '@angular/core';
import { CommonService } from './shared/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  public showLoader:any;
  constructor(private _service:CommonService){
    this._service.loader.subscribe((data) => this.showLoader = data)
  }
  title = 'socket-poc';
}
