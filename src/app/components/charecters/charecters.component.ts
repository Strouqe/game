import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Charecter } from 'src/app/models/charecter.model';
import { ServerDataService } from 'src/app/services/server-data.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-charecters',
  templateUrl: './charecters.component.html',
  styleUrls: ['./charecters.component.scss'],
})
export class CharectersComponent implements OnInit {

  charecters: Charecter[];

  charectersSubscription: Subscription;

  constructor(
    private dataService: ServerDataService,
    // public webSocketService: WebsocketService,

  ) {
  }

  ngOnInit(): void {
    // this.webSocketService.connect();

    this.charectersSubscription = this.dataService.charectersChanged.subscribe((charecters) => {
      this.charecters = charecters;
      console.log('Response from websocket: ', charecters);
    });
    console.log('charecters in charecters component ====>', this.charecters);
    // this.wsSubscription = this.subject.subscribe((response: any) => {
    //   console.log('test', response);
    //   let data = response;

    //   console.log('data', data);
    //   this.chat = [...this.chat, data.message];
    //   console.log('chat', this.chat);
    // });
    // this.userSubscription = this.userService.userChanged.subscribe(
    //   (user: User) => {
    //     this.user = user;
    //     console.log("User in user component ====>",this.user);
    //   }
    // );
    // this.userService.fetchUser();
  }
}
