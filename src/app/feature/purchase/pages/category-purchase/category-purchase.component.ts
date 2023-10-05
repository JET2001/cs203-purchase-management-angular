import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShowTableComponent } from '../../components/show-table/show-table.component';

@Component({
  selector: 'app-category-purchase',
  templateUrl: './category-purchase.component.html',
  styleUrls: ['./category-purchase.component.scss']
})
export class CategoryPurchaseComponent implements OnInit {
  eventID: string | undefined;
  eventTitle: string | undefined;
  categories: string[];
  categoriesForm: FormGroup;
  selectedCategory: string | undefined;
  showSeatingPlan = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
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
  }


  handleBack(){
    this.router.navigate(['/login']);
  }

  handleNext(){}

  handleInformationClick(): void {
  }

  toggleSeatingPlan(): void {
    this.showSeatingPlan = !this.showSeatingPlan; // Toggle the value
  }
}
