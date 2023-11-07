import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { PurchaseCategoriesPopupComponent } from '../../components/purchase-categories-popup/purchase-categories-popup.component';


@Component({
  selector: 'app-category-purchase',
  templateUrl: './category-purchase.component.html',
  styleUrls: ['./category-purchase.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoryPurchaseComponent implements OnInit {
  eventID: string | undefined;
  eventTitle: string | undefined;
  categories: string[];
  categoriesForm: FormGroup;
  selectedCategory: string | undefined;
  showSeatingPlan = false;
  groupSize: number | undefined;
  

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private activeModal: NgbModal
  ){
    this.categoriesForm = this.fb.group({});
  }


  async ngOnInit() {
    //use mock data for Taylor Swift concert
    this.eventTitle = 'Taylor Swift The Eras Tour';
    this.eventID = 'tswift-era-2024';
    // if category has less than (group size) amount of tickets 
    // remaining, remove it from array
    this.categories = ['CAT 1', 'CAT 2', 'CAT 3', 'CAT 4', 'CAT 5', 'CAT 6']
    this.activeModal.open(PurchaseCategoriesPopupComponent, { centered: true });
    this.groupSize = 4;
  }


  handleBack(){
    this.authService.email = undefined;
    this.authService.userID = undefined;
    this.authService.user = undefined;
    this.router.navigate(['/login']); 
  }

  handleNext(){
    this.router.navigate(['/purchase/confirmation', this.selectedCategory]);
  }

  handleInformationClick(): void {
    this.activeModal.open(PurchaseCategoriesPopupComponent, { centered: true });
  }

  toggleSeatingPlan(): void {
    this.showSeatingPlan = !this.showSeatingPlan; // Toggle the value
  }

}
