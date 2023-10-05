import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
  ){
    this.categoriesForm = this.fb.group({});
  }


  async ngOnInit() {
    //use mock data for taylor swift 
    this.eventTitle = 'Taylor Swift The Eras Tour';
    this.eventID = 'tswift-era-2024';
    this.categories = ['CAT 1 $348', 'CAT 2 $328', 'CAT 3 $268', 'CAT 4 $248', 'CAT 5 $168', 'CAT 6 $108']
  }

  handleBack(){}

  handleNext(){}

  handleInformationClick(){}
}
