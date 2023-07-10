import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { WebsocketService } from './websocket.service';


const sampleUser: User = {
  name: 'John Doe',
  currencyBalance: 101,
  currencyIncome: 10,
  characters: [
    {
      name: 'Marty',
      price: 100,
      income: 10,
      image: 'https://res.cloudinary.com/demo/image/twitter/1330457336.jpg',
      fatigue: 0,
      characteristics: {
        intelect: 15,
        strength: 15,
        dexterity: 15,
      },
    },
    {
      name: 'Doc',
      price: 100,
      income: 10,
      image: 'https://res.cloudinary.com/demo/image/twitter/1330457336.jpg',
      fatigue: 0,
      characteristics: {
        intelect: 15,
        strength: 15,
        dexterity: 15,
      },
    },
  ],
  missionsCompleated: [
    {
      name: 'Dungeon Exploration',
      dificulty: 100,
      reward: 100,
      requirements: {
        intelect: 15,
        strength: 15,
        dexterity: 15,
      }
    },
    {
      name: 'Dungeon Exploration',
      dificulty: 100,
      reward: 100,
      requirements: {
        intelect: 15,
        strength: 15,
        dexterity: 15,
      }
    },
  ],
};

export interface Message {
  author: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userChanged: Subject<User>;
  message: Subject<Message>;
  private user: User;

  constructor() {

  }

  fetchUser(): void {
    this.user = sampleUser;
    this.userChanged.next(this.user);
  }
}
