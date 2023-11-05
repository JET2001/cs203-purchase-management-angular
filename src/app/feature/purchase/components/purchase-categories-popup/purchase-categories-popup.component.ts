import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-purchase-categories-popup',
  templateUrl: './purchase-categories-popup.component.html',
  styleUrls: ['./purchase-categories-popup.component.scss']
})
export class PurchaseCategoriesPopupComponent {
  constructor(public activeModal: NgbActiveModal) {}
}
