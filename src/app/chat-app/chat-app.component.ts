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

    this._service.listen('welcome').subscribe((data) => {
      let obj = {
        userId: this.senderId,
        socketId: data.id
      }
      this._service.emit('setMapper', obj)
    })
    this._commmonService.userName.subscribe((data) => {
      this.userName = data
      this._service.emit('setUserName', data)
    })

    this._service.listen('alive').subscribe((data) => this.onlineUser = Object.keys(data.users))

    this._commmonService.getUsers().subscribe((data) => this.getAllUsersData(data.data.doc))
  }

  public getAllUsersData(users: any) {
    this.allUsersData = users
    let currentUser = users.find((items: any) => items.first_name === this.userName)
    this.senderId = currentUser._id
    let removeId = users.indexOf(currentUser)
    this.allUsersData.splice(removeId, 1);
  }

  public emitMessage(message: string) {
    let obj = {
      is_read: false,
      sender: this.senderId,
      receiver: this.receiverId,
      time: this.time,
      type: 'text',
      content: {
        text: message
      }
    }

  }

  public emitReceiverId(user: any) {
    this.receiverId = user._id;
  }
}