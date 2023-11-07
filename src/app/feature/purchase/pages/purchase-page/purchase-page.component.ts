import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-purchase-page',
  templateUrl: './purchase-page.component.html',
  styleUrls: ['./purchase-page.component.scss']
})
export class PurchasePageComponent {
  eventID: string | undefined;
  eventTitle: string | undefined;
  selectedCategory: string | null;
  groupSize: number | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    //use mock data for Taylor Swift concert
    this.eventTitle = 'Taylor Swift The Eras Tour';
    this.eventID = 'tswift-era-2024';
    this.groupSize = 4;
    this.route.paramMap.subscribe(params => {
      this.selectedCategory = params.get('selectedCategory');
    });
  }

  handlePurchase(){
    this.router.navigate(['/purchase/confirmation', this.selectedCategory]);
  }

  handleBack() {
    this.router.navigate(['/purchase/categories']);
  }
}
