import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html'
})
export class ChatAppComponent implements OnInit {

  public userName: string;
  public onlyChatUsers: any;
  public allUsers: any;
  public onlineUser: any;
  public senderId: string;
  public receiverId: string;
  public receiverName: string;
  public time: any;
  public getIds: any;
  public chatsData: any;

  constructor(
    private _service: SocketService,
    private _commmonService: CommonService
  ) {
    this.userName = '';
    this.senderId = '';
    this.receiverId = '';
    this.receiverName = '';
  }

  ngOnInit(): void {
    this.props()
  }

  public props() {
    setInterval(() => {
      this.time = new Date();
    }, 1000)

    let stringData: any = localStorage.getItem('user')
    let user = JSON.parse(stringData)
    this.userName = user.first_name
    this.senderId = user._id
    this._service.emit('setUserName', this.userName)
    this._commmonService.getChatUsers(this.senderId).subscribe((items) => this.onlyChatUsers = items)


    this._service.listen('welcome').subscribe((data) => {
      let obj = {
        userId: this.senderId,
        socketId: data.id
      }
      this._service.emit('setMapper', obj)
    })

    this._service.listen('chat').subscribe((data) => {
      this.chatsData.push(data)
      console.log(data);
    })
    this._service.listen('alive').subscribe((data) => {
      this.onlineUser = Object.keys(data.users)
      // console.log(data);
    })
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
    this.chatsData.push(Object.assign(obj, this.getIds))
  }

  public emitIds(object: any) {
    this.receiverId = object.receiver;
    this.getIds = object;
    this._service.getMessages(object.chat).subscribe((data) => this.chatsData = data.data.doc);
  }

  public emitReceiverName(name: string) {
    this.receiverName = name
  }
}