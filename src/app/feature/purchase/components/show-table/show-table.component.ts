import { Component } from '@angular/core';

@Component({
  selector: 'app-show-table',
  templateUrl: './show-table.component.html',
  styleUrls: ['./show-table.component.scss']
})
export class ShowTableComponent {
  tableData = [
    { category: 'CAT 1', price: 348, seatsRemaining: 50 },
    { category: 'CAT 2', price: 328, seatsRemaining: 20 },
    { category: 'CAT 3', price: 268, seatsRemaining: 10 },
    { category: 'CAT 4', price: 248, seatsRemaining: 10 },
    { category: 'CAT 5', price: 168, seatsRemaining: 10 },
    { category: 'CAT 6', price: 108, seatsRemaining: 10 }
  ];
}
