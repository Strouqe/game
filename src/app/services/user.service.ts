import { EventEmitter, Injectable } from '@angular/core';
import {
  NEVER,
  Observable,
  Subject,
  Subscription,
  distinctUntilChanged,
  fromEvent,
  mapTo,
  merge,
  of,
  shareReplay,
  tap,
  timer,
  withLatestFrom,
} from 'rxjs';
import { map, scan, startWith, switchMap } from 'rxjs/operators';
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

export interface CounterStateModel {
  count: number;
  isTicking: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userChanged: Subject<User>;
  incomeChanged: Subject<number>;
  userIncomeSubscription: Subscription;
  incomeGeneratorSubscription: Subscription;

  initialCounterState: CounterStateModel;
  patchCounterState: Subject<Partial<CounterStateModel>>;
  counterCommands$: any;
  commandFromTick$: Observable<Partial<CounterStateModel>>;
  commandFromReset$: Observable<Partial<CounterStateModel>>;
  counterState$: Observable<CounterStateModel>;
  isTicking$: any;

  trigerStart: EventEmitter<void> = new EventEmitter();
  trigerPause: EventEmitter<void> = new EventEmitter();
  // stopBtn = document.querySelector('#stopBtn') as HTMLButtonElement;
  // pauseBtn = document.querySelector('#pauseBtn') as HTMLButtonElement;

  // startClick$ = fromEvent(this.trigerStart, 'click');
  // stopClick$ = fromEvent(this.stopBtn, 'click');
  // pauseBtn$ = fromEvent(this.pauseBtn, 'click');

  private user: User;

  constructor() {
    this.userChanged = new Subject<User>();

    this.initialCounterState = {
      count: 0,
      isTicking: true,
    };

    this.patchCounterState = new Subject<Partial<CounterStateModel>>();

    this.counterCommands$ = merge(
      this.trigerStart.pipe(mapTo({ isTicking: true })),
      this.trigerPause.pipe(mapTo({ isTicking: false })),
      // this.stopClick$.pipe(mapTo({ ...this.initialCounterState })),
      this.patchCounterState.asObservable()
    );

    this.counterState$ = this.counterCommands$.pipe(
      startWith(this.initialCounterState),
      scan(
        (counterState: CounterStateModel, command): CounterStateModel => ({
          ...counterState,
          ...command,
        })
      ),
      shareReplay(1)
    );

    this.isTicking$ = this.counterState$.pipe(
      map((state) => state.isTicking),
      distinctUntilChanged()
    );

    this.commandFromTick$ = this.isTicking$.pipe(
      switchMap((isTicking) => (isTicking ? timer(0, 1000) : NEVER)),
      withLatestFrom(this.counterState$, (_, counterState) => ({
        count: counterState.count,
      })),
      tap(({ count }) => {
        console.log('count', count);

          this.patchCounterState.next({ count: count + 10 });

      })
    );

    // this.commandFromReset$ = this.stopClick$.pipe(mapTo({ ...this.initialCounterState }));

    this.incomeGeneratorSubscription = merge(
      this.commandFromTick$,
      this.commandFromReset$
    ).pipe(startWith(this.initialCounterState))
      .subscribe((state) => {
        console.log('state', state);
        this.user.currencyBalance = state.count!;
        this.userChanged.next(this.user);
      });
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
}
