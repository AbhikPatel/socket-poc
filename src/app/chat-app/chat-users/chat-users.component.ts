import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html'
})
export class ChatUsersComponent implements OnInit{

  @Input() public usersData:any;
  constructor(){

  }

  ngOnInit(): void {
    
  }
}
