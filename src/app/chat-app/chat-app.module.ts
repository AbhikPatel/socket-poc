import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatAppRoutingModule } from './chat-app-routing.module';
import { ChatAppComponent } from './chat-app.component';
import { ChatUsersComponent } from './chat-users/chat-users.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChatAppComponent,
    ChatUsersComponent,
    ChatMessagesComponent
  ],
  imports: [
    CommonModule,
    ChatAppRoutingModule,
    ReactiveFormsModule
  ]
})
export class ChatAppModule { }
