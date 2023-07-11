import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Mission } from 'src/app/models/mission.model';
import { ServerDataService } from 'src/app/services/server-data.service';
import { DialogAnimationComponent } from '../dialog-animation/dialog-animation.component';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit{
  missions: Mission[];

  missionsSubscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private dataService: ServerDataService,
    ) { }

  ngOnInit(): void {
    this.missionsSubscription = this.dataService.missionsChanged.subscribe((missions) => {
      this.missions = missions;
      console.log('Response from websocket: ', missions);
    });
    console.log('missions in missions component ====>', this.missions);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}



