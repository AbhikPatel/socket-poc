import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html'
})
export class ChatAppComponent implements OnInit {

  public userName: string;
  public allUsersData: any;
  public onlineUser: any;
  public senderId: string;
  public receiverId: string;
  public time: any;
  public getIds: any;

  constructor(
    private _service: SocketService,
    private _commmonService: CommonService
  ) {
    this.userName = '';
    this.senderId = '';
    this.receiverId = '';
  }

  ngOnInit(): void {
    this.props()
  }

  public props() {
    setInterval(() => {
      this.time = new Date();
    }, 1000)

    this._commmonService.userName.subscribe((data) => {
      this.userName = data.first_name
      this.senderId = data._id;
      this._service.emit('setUserName', data.first_name)
      this._commmonService.getChatUsers(data._id).subscribe((items) => this.allUsersData = items.data.doc.chats)
    })

    this._service.listen('welcome').subscribe((data) => {
      let obj = {
        userId: this.senderId,
        socketId: data.id
      }
      this._service.emit('setMapper', obj)
    })

    this._service.listen('chat').subscribe((data) => console.log(data))
    this._service.listen('alive').subscribe((data) => this.onlineUser = Object.keys(data.users))
  }

  public emitMessage(message: string) {
    let obj = {
      is_read: false,
      sender: this.senderId,
      time: this.time,
      type: 'text',
      content: {
        text: message
      }
    }
    this._service.emit('chat', Object.assign(obj, this.getIds))
  }

  public emitIds(object: any) {
    this.receiverId = object.receiver
    this.getIds = object
  }
}