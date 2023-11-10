import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPurchaseComponent } from './category-purchase.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { ShowTableComponent } from '../../components/show-table/show-table.component';
import { Dropdown } from 'primeng/dropdown';
import { TextButtonComponent } from 'src/app/shared/components/text-button/text-button.component';
import { Overlay } from 'primeng/overlay';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';

describe('CategoryPurchaseComponent', () => {
  let component: CategoryPurchaseComponent;
  let fixture: ComponentFixture<CategoryPurchaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryPurchaseComponent, HeaderComponent, ShowTableComponent, Dropdown, TextButtonComponent, Overlay],
      providers: [HttpClient, HttpHandler],
      imports: [ChevronDownIcon],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(CategoryPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
