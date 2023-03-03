import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatUsersComponent implements OnInit {

  @Input() public set users(v: any) {
    if (v)
      this.removeSender(v)
  }
  public get users(): any {
    return this._users;
  }

  @Input() public senderId: any
  @Input() public getAllUsers: any;
  @Input() public name: string;
  @Input() public online: any
  @Output() public emitIds: EventEmitter<any>;
  @Output() public emitReceiverName: EventEmitter<string>;
  @Output() public emitNewMode: EventEmitter<boolean>;

  public userId: string
  private _users: any;
  public searchText: any = '';

  @ViewChild('toggle') public toggle: any
  constructor(
    private _fb: FormBuilder
  ) {
    this.userId = '';
    this.emitIds = new EventEmitter();
    this.emitReceiverName = new EventEmitter();
    this.emitNewMode = new EventEmitter();
    this.name = ''
  }

  ngOnInit(): void {
  }

  public showOnline(name: string) {
    let findName
    if (name && this.online)
      findName = this.online.find((user: string) => user === name)

    // console.log(name, findName);

    return findName ? 'Online' : 'Offline'
  }

  public onUser(id: any, chatId: string, name: string) {
    this.userId = id;
    let ObjId = {
      receiver: id,
      chat: chatId
    }
    this.emitIds.emit(ObjId);
    this.emitReceiverName.emit(name);
  }

  public removeSender(data: any) {
    data.map((items: any) => {
      let usertoRemove = items.members.find((user: any) => user._id === this.senderId)
      let id = items.members.indexOf(usertoRemove)
      items.members.splice(id, 1)
    })
    this._users = data;
    this.onUser(this._users[0].members[0]._id, this._users[0]._id, this._users[0].members[0].first_name)
  }

  public addUser(user: any) {
    let isUserThere = this.users.find((items: any) => items.members[0].first_name === user.first_name)
    if (isUserThere) {
      this.onUser(user._id, isUserThere._id, user.first_name)
    } else {
      let data = {
        members: [
          {
            first_name: user.first_name,
            last_name: user.last_name,
          }
        ]
      }
      this._users.push(data);
      this.emitReceiverName.emit(user.first_name);
      this.emitNewMode.emit(true)
      this.onUser(user._id, '', user.first_name)
    }
    this.toggle.nativeElement.checked = false;
  }
}
