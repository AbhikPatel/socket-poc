import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html'
})
export class ChatMessagesComponent implements OnInit {


  @Input() public set chats(v: any) {
    this._chats = v;
  }
  public get chats(): any {
    return this._chats;
  }

  @Input() public senderId: any;
  @Input() public name:any;

  @Output() public emitSide: EventEmitter<boolean>
  @Output() public emitMessage: EventEmitter<any>

  public chatGroup: FormGroup;
  private _chats: any;

  constructor(
    private _fb: FormBuilder
  ) {
    this.chatGroup = this._fb.group({
      message: ['', [Validators.required]]
    })
    this.emitSide = new EventEmitter();
    this.emitMessage = new EventEmitter();
  }

  ngOnInit(): void {
  }

  /**
   * @name onSubmit
   * @description This method is called on Submit
   */
  public onSubmit() {
    if (this.chatGroup.valid){
      this.emitMessage.emit(this.chatGroup.value.message)
    }

    this.chatGroup.reset();
  }



  public onBack() {
    this.emitSide.emit(false)
  }
}
