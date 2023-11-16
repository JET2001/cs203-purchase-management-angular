import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseCategoriesPopupComponent } from './purchase-categories-popup.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TextButtonComponent } from 'src/app/shared/components/text-button/text-button.component';

describe('PurchaseCategoriesPopupComponent', () => {
  let component: PurchaseCategoriesPopupComponent;
  let fixture: ComponentFixture<PurchaseCategoriesPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseCategoriesPopupComponent, TextButtonComponent],
      providers: [NgbActiveModal]
    });
    fixture = TestBed.createComponent(PurchaseCategoriesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
