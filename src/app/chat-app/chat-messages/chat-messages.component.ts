import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html'
})
export class ChatMessagesComponent implements OnInit {

  @Input() public sender: any;
  @Input() public name: any;

  @Input() public set chats(v: any) {
    if (v) {
      this._chats = v;
      this._chats.map((items: any) => items.is_read = true);
    }
  }

  public get chats(): any {
    return this._chats;
  }
  
  @Output() public emitMessage: EventEmitter<string>
  
  private _chats: any;
  public chatGroup: FormGroup;

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

  public onSubmit() {
    if (this.chatGroup.valid)
      this.emitMessage.emit(this.chatGroup.value.message)

    this.chatGroup.reset();
      
  }

  public showTime(time: any) {
    let data = new Date(time);
    let min = data.getMinutes() % 12;
    let sec = data.getSeconds() % 12;
    min = this.addDigits(min);
    sec = this.addDigits(sec);
    return min + ':' + sec;
  }

  public addDigits(num:any){
    if(num.toString().length === 1){
      return '0' + num;
    }else{
      return num
    }
  }
}
