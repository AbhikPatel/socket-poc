import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatUsersComponent implements OnInit {

  @Input() public usersData: any;

  @Input() public onlineData:any;
  @Output() public emitSide:EventEmitter<boolean>

  public userId: number;
  constructor() {
    this.userId = 0;
    this.emitSide = new EventEmitter();
  }

  ngOnInit(): void {

  }

  public onUser(id: number) {
    this.userId = id;
    this.emitSide.emit(true)
  }

  public showOnline(name: string) {
    let test;
    if (this.onlineData)
      test = this.onlineData.find((items: any) => items === name)

    return test ? 'Online' : 'Offline'
  }
}
