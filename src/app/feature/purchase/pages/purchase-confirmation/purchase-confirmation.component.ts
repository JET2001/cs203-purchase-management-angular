import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { GetEventInfoService } from 'src/app/shared/services/get-event-info/get-event.info.service';
import { GetGroupInfoService } from 'src/app/shared/services/get-group-info/get-group-info.service';
import { GetSeatInfoService } from 'src/app/shared/services/get-seat-info/get-seat-info.service';

@Component({
  selector: 'app-purchase-confirmation',
  templateUrl: './purchase-confirmation.component.html',
  styleUrls: ['./purchase-confirmation.component.scss'],
})
export class PurchaseConfirmationComponent implements OnInit {
  eventID: string | undefined;
  eventTitle: string | undefined;
  groupSize: number | undefined;
  selectedCategory: string | null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private getGroupInfoService: GetGroupInfoService,
    private getEventInfoService: GetEventInfoService,
    private getSeatInfoService: GetSeatInfoService
  ) {}

  async ngOnInit() {
    //use mock data for Taylor Swift concert
    // this.eventTitle = 'Taylor Swift The Eras Tour';
    // this.eventID = 'tswift-era-2024';
    // this.groupSize = 4;
    // this.route.paramMap.subscribe(params => {
    //   this.selectedCategory = params.get('selectedCategory');
    // });
    await this.getEventInfoService.getEventTitle().subscribe((data) => {
      this.eventTitle = data.eventTitle;
    });

    await this.getGroupInfoService.getGroupSize().subscribe((size) => {
      this.groupSize = size;
    });
    this.eventID = this.getEventInfoService.getEventId;

    this.selectedCategory = this.getSeatInfoService.categoryId;
  }

  handleFeedback() {
    this.router.navigate(['/login']);
  }
}
