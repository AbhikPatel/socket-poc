import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html'
})
export class ChatMessagesComponent implements OnInit{

  @Output() public emitSide:EventEmitter<boolean>
  @Output() public emitMessage:EventEmitter<any>
  public chatGroup:FormGroup;

  constructor(
    private _fb:FormBuilder
  ){
    this.chatGroup = this._fb.group({
      message:['',[Validators.required]]
    })
    this.emitSide = new EventEmitter()
    this.emitMessage = new EventEmitter()
  }

  ngOnInit(): void {
    
  }

  /**
   * @name onSubmit
   * @description This method is called on Submit
   */
  public onSubmit(){
    this.emitMessage.emit(this.chatGroup.value.message)
  }

  

  public onBack(){
    this.emitSide.emit(false)
  }
}
