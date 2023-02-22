import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatUsersComponent implements OnInit {

  @Input() public usersData: any;
  @Input() public name: any;

  @Input() public onlineData:any;
  @Output() public emitSide:EventEmitter<boolean>
  @Output() public emitReceiverId:EventEmitter<string>

  public userId: string;
  constructor() {
    this.userId = '';
    this.emitSide = new EventEmitter();
    this.emitReceiverId = new EventEmitter();
  }

  ngOnInit(): void {

  }

  public onUser(id: string) {
    this.userId = id;
    this.emitSide.emit(true)
    this.emitReceiverId.emit(id)
  }

  public showOnline(name: string) {
    let test;
    if (this.onlineData)
      test = this.onlineData.find((items: any) => items === name)

    return test ? 'Online' : 'Offline'
  }
}
