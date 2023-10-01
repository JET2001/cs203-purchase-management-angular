import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPurchaseComponent } from './category-purchase.component';

describe('CategoryPurchaseComponent', () => {
  let component: CategoryPurchaseComponent;
  let fixture: ComponentFixture<CategoryPurchaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryPurchaseComponent]
    });
    fixture = TestBed.createComponent(CategoryPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
