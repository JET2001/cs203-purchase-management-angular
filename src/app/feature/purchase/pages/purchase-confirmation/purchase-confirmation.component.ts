import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-purchase-confirmation',
  templateUrl: './purchase-confirmation.component.html',
  styleUrls: ['./purchase-confirmation.component.scss']
})
export class PurchaseConfirmationComponent implements OnInit {

  eventID: string | undefined;
  eventTitle: string | undefined;
  groupSize: number | undefined;
  selectedCategory: string | null;

  constructor( 
    private router: Router,
    private route: ActivatedRoute
  ){

  }

  async ngOnInit() {
    //use mock data for Taylor Swift concert
    this.eventTitle = 'Taylor Swift The Eras Tour';
    this.eventID = 'tswift-era-2024';
    this.groupSize = 4;
    this.route.paramMap.subscribe(params => {
      this.selectedCategory = params.get('category');
    });
  }

  handleFeedback() {
    this.router.navigate(['/login']);
  }
  
}
