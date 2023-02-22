import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatUsersComponent implements OnInit {

  @Input() public users: any
  @Input() public online: any
  @Output() public emitReceiverId:EventEmitter<string>;

  public userId: string

  constructor() {
    this.userId = '';
    this.emitReceiverId = new EventEmitter();
  }

  ngOnInit(): void {

  }

  public showOnline(name: string) {
    let findName
    if (name && this.online)
      findName = this.online.find((user: string) => user === name)

    return findName ? 'Online' : 'Offline'
  }

  public onUser(user: any) {
    this.userId = user._id;
    this.emitReceiverId.emit(user)
  }
}
