import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dialog-animation',
  templateUrl: './dialog-animation.component.html',
  styleUrls: ['./dialog-animation.component.scss']
})
export class DialogAnimationComponent {
  constructor(public dialogRef: MatDialogRef<DialogAnimationComponent>,
    private userService: UserService) {}

    triggerResumeIncomeGeneration(): void {
      this.userService.trigerStart();
    }
}
