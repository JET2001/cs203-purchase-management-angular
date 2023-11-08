import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, interval, switchMap, takeUntil, queue } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { GetEventInfoService } from 'src/app/shared/services/get-event-info/get-event.info.service';
import { GetGroupInfoService } from 'src/app/shared/services/get-group-info/get-group-info.service';
export const LARGENUMBER = 100000;

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss'],
})
export class WaitingRoomComponent implements OnInit, OnDestroy {
  queueNumber: number;
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private getGroupInfoService: GetGroupInfoService,
    private authService: AuthenticationService,
    private getEventInfoService: GetEventInfoService
  ) {}

  ngOnInit(): void {
    // interval(5 * 100).subscribe(() => {
    //   this.getGroupInfoService.getQueueNumber().subscribe((queueNumber) => {
    //     this.queueNumber = queueNumber;
    //     this.queueNumber = this.queueNumber / LARGENUMBER;
    //     console.log(this.queueNumber)
    //   });
    // });
    // interval(5000) // Poll every 5 seconds
    //   .pipe(
    //     takeUntil(this.destroy$), // Unsubscribe when the component is destroyed
    //     switchMap(() => this.getGroupInfoService.getQueueNumber())
    //   )
    //   .subscribe((queueNumber) => {
    //     //this.queueNumber = queueNumber / LARGENUMBER;
    //     // this.queueNumber = this.queueNumber / 1000;
    //     this.queueNumber = queueNumber;
    //     console.log(this.queueNumber);
    //   });
    this.getGroupInfoService
      .getQueueNumber(
        this.authService.email!,
        this.getEventInfoService.getEventId,
        this.getGroupInfoService.queueId
      )
      .subscribe((queueNumber) => {
        console.log(queueNumber);
        this.queueNumber = queueNumber.queueNumber;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isFirst(): boolean {
    if (this.queueNumber === 1) {
      return true;
    }
    return false;
  }

  handleNext() {
    this.router.navigate(['purchase', 'categories']);
  }
}
