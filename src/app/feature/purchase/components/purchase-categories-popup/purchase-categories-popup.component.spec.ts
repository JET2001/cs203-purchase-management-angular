import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseCategoriesPopupComponent } from './purchase-categories-popup.component';

describe('PurchaseCategoriesPopupComponent', () => {
  let component: PurchaseCategoriesPopupComponent;
  let fixture: ComponentFixture<PurchaseCategoriesPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseCategoriesPopupComponent]
    });
    fixture = TestBed.createComponent(PurchaseCategoriesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
