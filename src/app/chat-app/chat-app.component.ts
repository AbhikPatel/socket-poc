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
  public senderId: any;
  public receiverId: string;
  public openSide: boolean;
  public time: any;
  public onlineUsers: Subject<any>;
  public chatData: any;
  public receiverName: any;

  constructor(
    private _service: SocketService,
    private _commonService: CommonService
  ) {
    this.userName = '';
    this.receiverId = '';
    this.onlineUsers = new Subject();
    this.openSide = false;
    this.media = false;
  }

  ngOnInit(): void {
    this.props();
  }

  public props() {
    setInterval(() => {
      this.time = new Date();
    }, 1000)

    this._commonService.getUsers().subscribe((items) => {
      this.users = items.data.doc
      let findUser = this.users.find((user: any) => user.first_name === this.userName)
      this.senderId = findUser._id
      let id = this.users.indexOf(findUser)
      this.users.splice(id, 1)
    })

    this._service.listen('welcome').subscribe((data) => {
      let obj = {
        userId:this.senderId,
        socketId:data.id
      }
      this._service.emit('setMapper', obj)
    })

    if (window.innerWidth < 568)
      this.media = true

    this._commonService.userName.subscribe((data) => {
      this.userName = data
      this._service.emit('setUserName', data)
    })
    this._service.listen('connect_error').subscribe((data) => console.log(data))
    this._service.listen('alive').subscribe((data) => this.onlineUsers.next(Object.keys(data.users)))

    this._service.listen('chat').subscribe((data) => console.log(data))
  }

  public emitSide(open: boolean) {
    this.openSide = open
  }

  public emitMessage(message: any) {
    let data = {
      is_read: false,
      sender: this.senderId,
      receiver: this.receiverId,
      time: this.time,
      type: 'text',
      content: {
        text: message
      }
    }

    this._service.emit('chat', data)
    this.chatData.push(data);
  }

  public emitReceiverId(id: string) {
    this.receiverId = id;
    this._service.getMessages(this.senderId, id).subscribe((data) => {
      let sender = data.data.doc
      this._service.getMessages(id, this.senderId).subscribe((data) => {
        this.chatData = sender.concat(data.data.doc)
      })
    })
    let data = this.users.find((items: any) => items._id === this.receiverId)
    this.receiverName = data.first_name
  }
}

// let data = {
//   is_read: false,
//   sender: this.senderId,
//   receiver: this.receiverId,
//   time: this.time,
//   type: 'text',
//   content: {
//     text: message
//   }
// }