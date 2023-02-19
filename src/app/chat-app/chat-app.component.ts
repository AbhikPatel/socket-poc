import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html'
})
export class ChatAppComponent implements OnInit{

  public users:any;

  constructor(
    private _service:SocketService,
    private _commonService:CommonService
  ){

  }

  ngOnInit(): void {
    this.props();
  }

  public props(){
    this._commonService.userName.subscribe((data) => this._service.emit('setUserName', data))
    this._service.listen('alive').subscribe((data) => {
      this.users = Object.keys(data.users)
    })
  }

}
