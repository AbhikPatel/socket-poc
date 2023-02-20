import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CommonService } from '../shared/common.service';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html'
})
export class ChatAppComponent implements OnInit {

  public users: any;
  public media: boolean;
  public userName: string;
  public openSide: boolean;
  public onlineUsers: Subject<any>;

  constructor(
    private _service: SocketService,
    private _commonService: CommonService
  ) {
    this.userName = ''
    this.onlineUsers = new Subject();
    this.openSide = false;
    this.media = false;
  }

  ngOnInit(): void {
    this.props();
  }

  public props() {

    if (window.innerWidth < 568)
      this.media = true
      
    this._commonService.userName.subscribe((data) => {
      this.userName = data
      this._service.emit('setUserName', data)
    })
    this._service.listen('connect_error').subscribe((data) => console.log(data))
    this._service.listen('alive').subscribe((data) => this.onlineUsers.next(Object.keys(data.users)))
    this._commonService.getUsers().subscribe((items) => {
      this.users = items.data.doc
      let findUser = this.users.find((user: any) => user.first_name === this.userName)
      let id = this.users.indexOf(findUser)
      this.users.splice(id, 1)
    })

    this._service.listen('chat').subscribe((data) => console.log(data))
  }

  public emitSide(open: boolean) {
    this.openSide = open
  }

  public emitMessage(message:any){
    let data = {
      is_read:false,
      sender:'63ef7184b057d6e5f00853db',
      receiver:'63ef7184b057d6e5f00853da',
      time:'29',
      type:'text',
      content:{
        text:message
      }
    }

    this._service.emit('chat', data)
    // debugger
  }

}
