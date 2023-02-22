import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html'
})
export class ChatMessagesComponent implements OnInit {

  chatGroup: FormGroup;
  @Output() public emitMessage:EventEmitter<string>
  constructor(
    private _fb: FormBuilder
  ) {
    this.chatGroup = this._fb.group({
      message: ['', [Validators.required]]
    })
    this.emitMessage = new EventEmitter();
  }

  ngOnInit(): void {
  }

  public onSubmit(){
    if(this.chatGroup.valid)
      this.emitMessage.emit(this.chatGroup.value.message)
  }
}
