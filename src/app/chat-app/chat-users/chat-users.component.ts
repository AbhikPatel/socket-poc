import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatUsersComponent implements OnInit {

  @Input() public set users(v: any) {
    this._users = v;
  }
  public get users(): any {
    return this._users;
  }

  @Input() public senderId: any
  @Input() public online: any
  @Output() public emitIds: EventEmitter<any>;

  public userId: string
  private _users: any;

  constructor() {
    this.userId = '';
    this.emitIds = new EventEmitter();
  }

  ngOnInit(): void {
  }

  public showOnline(name: string) {
    let findName
    if (name && this.online)
      findName = this.online.find((user: string) => user === name)

    return findName ? 'Online' : 'Offline'
  }

  public onUser(id: any, chatId:string) {
    this.userId = id;
    let ObjId = {
      receiver: id,
      chat:chatId
    }
    this.emitIds.emit(ObjId)
  }

  public showName(data:any){
    let ownerId = data.owner
    let owner = data.members.find((items:any) => items._id !== ownerId)
    return owner.first_name + ' ' + owner.last_name
  }
}
