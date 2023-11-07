import { Component, OnInit } from '@angular/core';
import { GetEventInfoService } from 'src/app/shared/services/get-event-info/get-event.info.service';
import { GetSeatInfoService } from 'src/app/shared/services/get-seat-info/get-seat-info.service';

@Component({
  selector: 'app-show-table',
  templateUrl: './show-table.component.html',
  styleUrls: ['./show-table.component.scss'],
})
export class ShowTableComponent implements OnInit {
  tableData: any;
  constructor(
    private getSeatInfoService: GetSeatInfoService,
    private getEventInfoService: GetEventInfoService
  ) {}
  ngOnInit(): void {
    this.getSeatInfoService
      .getSeatCategories(
        this.getEventInfoService.getEventId,
        this.getEventInfoService.getShowId
      )
      .subscribe((data) => {
        this.tableData = data;
        console.log(data)
      });
  }
  // tableData = [
  //   { category: 'CAT 1', price: 348, seatsRemaining: 50 },
  //   { category: 'CAT 2', price: 328, seatsRemaining: 20 },
  //   { category: 'CAT 3', price: 268, seatsRemaining: 10 },
  //   { category: 'CAT 4', price: 248, seatsRemaining: 10 },
  //   { category: 'CAT 5', price: 168, seatsRemaining: 10 },
  //   { category: 'CAT 6', price: 108, seatsRemaining: 10 }
  // ];
}
