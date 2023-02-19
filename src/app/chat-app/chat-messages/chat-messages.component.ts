import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html'
})
export class ChatMessagesComponent implements OnInit{

  public chatGroup:FormGroup;

  constructor(
    private _fb:FormBuilder
  ){
    this.chatGroup = this._fb.group({
      message:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    
  }

  public onSubmit(){
    console.log(this.chatGroup.value);
  }

}
