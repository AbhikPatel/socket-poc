import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
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
  public newMode: boolean;
  public typeData: Subject<boolean>;
  
  constructor(
    private _service: SocketService,
  ) {
    this.userName = '';
    this.senderId = '';
    this.receiverId = '';
    this.receiverName = '';
    this.newMode = false;
    this.typeData = new Subject();
  }

  ngOnInit(): void {
    this.props()
  }

  public props() {

    this._service.emit('onhello', 'Yo sup?')
    setInterval(() => {
      this.time = new Date();
    }, 1000)

    let stringData: any = localStorage.getItem('user')
    let user = JSON.parse(stringData)
    this.userName = user.first_name
    this.senderId = user._id
    this._service.emit('setUserName', this.userName)
    this._service.getChatUsers(this.senderId).subscribe((items) => this.onlyChatUsers = items)


    this._service.getUsers().subscribe((data) => this.allUsers = data.filter((items: any) => items.first_name !== this.userName))
    this._service.listen('welcome').subscribe((data) => {
      let obj = {
        userId: this.senderId,
        socketId: data.id
      }
      this._service.emit('setMapper', obj)
    })

    this._service.listen('chat').subscribe((data) => this.chatsData.push(data))
    this._service.listen('alive').subscribe((data) => {
      this.onlineUser = Object.keys(data.users)
      console.log(data);

    })
    this._service.listen('typing').subscribe((id) => {
      let findUser = this.allUsers.find((user:any) => user._id === id)
      if(findUser.first_name === this.receiverName){
       this.typeData.next(true)
        setTimeout(() => {
            this.typeData.next(false)
        }, 2000);
      }
    })
  }

  public emitMessage(message: string) {
    if (this.newMode) {
      let postData = {
        owner: this.senderId,
        chat_type: 'dm',
        title: 'dm',
        members: [
          this.senderId,
          this.receiverId
        ]
      }
      this.chatsData = [];
      this._service.postChat(postData).subscribe((data) => {
        this.getIds.chat = data
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
      })
      this.newMode = false
    } else {

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

  }

  public emitIds(object: any) {
    this.receiverId = object.receiver;
    if (object.chat !== '') {
      this.getIds = object;
      this._service.getMessages(object.chat).subscribe((data) => this.chatsData = data.data.doc);
    } else {
      this.chatsData = [];
    }
  }

  public emitReceiverName(name: string) {
    this.receiverName = name
  }

  public emitNewMode(mode: boolean) {
    this.newMode = mode
  }

  public emitOnTyping(data:any){
    this._service.emit('typing', this.senderId)
  }
}