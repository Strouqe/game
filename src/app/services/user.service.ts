import { Injectable } from '@angular/core';
import { Subject, timeInterval } from 'rxjs';
import { User } from '../models/user.model';

const sampleUser: User = {
  name: 'John Doe',
  currencyBalance: 101,
  currencyIncome: 10, // should remove and calculate from charecters
  charecters: [
    {
      id: 1,
      name: 'Morty',
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
      id: 2,
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
      id: 1,
      name: 'Dungeon Exploration',
      dificulty: 100,
      reward: 100,
      requirements: {
        intelect: 15,
        strength: 15,
        dexterity: 15,
      },
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
  userIncome: number;
  private user: User;

  constructor() {
    this.userChanged = new Subject<User>();

    this.startIncomeGeneration();
  }

  fetchUser(): void {
    this.user = sampleUser;
    this.user.currencyIncome = this.getUserIncome();
    this.userChanged.next(this.user);
  }



  private getUserIncome(): number {
    return this.user.charecters.reduce((acc, charecter) => {
      return acc + charecter.income;
    }, 0);
  }

  private startIncomeGeneration(): void {
    //timeout or timeInterval(60000).subscribe(() => {}); rxjs might be the right way to handle this
    setInterval(() => {
      this.user.currencyBalance += this.user.currencyIncome;
      this.userChanged.next(this.user);
    }, 60000);
  }
}
