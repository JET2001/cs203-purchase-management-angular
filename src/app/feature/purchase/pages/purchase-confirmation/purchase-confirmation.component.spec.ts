import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseConfirmationComponent } from './purchase-confirmation.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { TextButtonComponent } from 'src/app/shared/components/text-button/text-button.component';

describe('PurchaseConfirmationComponent', () => {
  let component: PurchaseConfirmationComponent;
  let fixture: ComponentFixture<PurchaseConfirmationComponent>;
  const fakeActivatedRoute = {
    snapshot: {
      data: {},
    },
  } as ActivatedRoute;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseConfirmationComponent, HeaderComponent, TextButtonComponent],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(PurchaseConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
