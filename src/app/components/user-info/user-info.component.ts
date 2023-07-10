import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { environment } from 'src/app/environments/environment';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Buffer } from 'buffer';
import { ChatService } from 'src/app/services/chat.service';
import { ServerDataService } from 'src/app/services/server-data.service';


export const WS_ENDPOINT = environment.URL;

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  wsSubscription: Subscription;
  subject = webSocket(WS_ENDPOINT)


  user: User;
  message = '';
  chat: string[] = [];

  constructor(
    private userService: UserService,
    public webSocketService: WebsocketService,
    private dataService: ServerDataService,
  ) {
    dataService.charectersChanged.subscribe(charecters => {
      console.log("Response from websocket: ", charecters);
    })


    this.webSocketService.connect();
  }

  ngOnInit(): void {

    this.wsSubscription = this.subject.subscribe((response: any) => {
      console.log("test",response)
      let data = response
      // let data = JSON.parse(response.data)
      // let data = new Buffer( response.data, "base64").toString()
      // let data = Buffer.from(response.data, 'base64').toString()
      console.log("data",data)
      this.chat = [...this.chat, data.message]
      console.log("chat",this.chat)
      // console.log("Server responce ======>", new Buffer( response.data, "base64").toString())
    })
    // this.userSubscription = this.userService.userChanged.subscribe(
    //   (user: User) => {
    //     this.user = user;
    //     console.log("User in user component ====>",this.user);
    //   }
    // );
    // this.userService.fetchUser();
  }

  ngOnDestroy(): void {
    // this.webSocketService.close();
    this.userSubscription.unsubscribe();
    this.wsSubscription.unsubscribe();
  }

  sendToServer($event: any) {
    // this.dataService.charectersChanged.next($event);

    // this.webSocketService.sendMessage($event);

    // this.subject.next($event);
  }
}
