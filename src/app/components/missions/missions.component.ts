import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Mission } from 'src/app/models/mission.model';
import { ServerDataService } from 'src/app/services/server-data.service';
import { DialogAnimationComponent } from '../dialog-animation/dialog-animation.component';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit, OnDestroy{
  missions: Mission[];

  missionsSubscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private dataService: ServerDataService,
    private userService: UserService,
    ) { }

  ngOnInit(): void {
    this.missionsSubscription = this.dataService.missionsChanged.subscribe((missions) => {
      this.missions = missions;
      console.log('Response from websocket: ', missions);
    });
    console.log('missions in missions component ====>', this.missions);
  }

  ngOnDestroy(): void {
    this.missionsSubscription.unsubscribe();
  }

  triggerPauseIncomeGeneration(): void {
    this.userService.trigerPause();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.triggerPauseIncomeGeneration();
    this.dialog.open(DialogAnimationComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}



