import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Mission } from 'src/app/models/mission.model';
import { ServerDataService } from 'src/app/services/server-data.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit{
  missions: Mission[];

  missionsSubscription: Subscription;

  constructor(    private dataService: ServerDataService,) { }

  ngOnInit(): void {
    this.missionsSubscription = this.dataService.missionsChanged.subscribe((missions) => {
      this.missions = missions;
      console.log('Response from websocket: ', missions);
    });
    console.log('missions in missions component ====>', this.missions);
  }

}
