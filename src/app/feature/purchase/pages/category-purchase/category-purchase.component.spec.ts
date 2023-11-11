import { SeatCategories } from './../../../../models/seat-categories';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CategoryPurchaseComponent } from './category-purchase.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { ShowTableComponent } from '../../components/show-table/show-table.component';
import { Dropdown } from 'primeng/dropdown';
import { TextButtonComponent } from 'src/app/shared/components/text-button/text-button.component';
import { Overlay } from 'primeng/overlay';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { GetSeatInfoService } from 'src/app/shared/services/get-seat-info/get-seat-info.service';
import { GetEventInfoService } from 'src/app/shared/services/get-event-info/get-event.info.service';
import { GetGroupInfoService } from 'src/app/shared/services/get-group-info/get-group-info.service';
import { of } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseCategoriesPopupComponent } from '../../components/purchase-categories-popup/purchase-categories-popup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CategoryPurchaseComponent', () => {
  let component: CategoryPurchaseComponent;
  let fixture: ComponentFixture<CategoryPurchaseComponent>;
  let getSeatInfoService: GetSeatInfoService;
  let getEventInfoService: GetEventInfoService;
  let getGroupInfoService: GetGroupInfoService;
  let authService: AuthenticationService;
  let router: Router;
  let activeModal: NgbModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryPurchaseComponent, HeaderComponent, ShowTableComponent, Dropdown, TextButtonComponent, Overlay],
      providers: [HttpClient, HttpHandler],
      imports: [ChevronDownIcon],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    getSeatInfoService = TestBed.inject(GetSeatInfoService);
    getEventInfoService = TestBed.inject(GetEventInfoService);
    getGroupInfoService = TestBed.inject(GetGroupInfoService);
    authService = TestBed.inject(AuthenticationService);
    activeModal = TestBed.inject(NgbModal);
    router = TestBed.inject(Router);
    spyOnProperty(getEventInfoService, 'getEventId', 'get').and.returnValue('MOCK-EVENT-ID-1');
    spyOnProperty(getEventInfoService, 'getShowId', 'get').and.returnValue('MOCK-SHOW-ID-1');
    spyOnProperty(getGroupInfoService, 'getGroupId', 'get').and.returnValue('MOCK-GROUP-ID-1');
    spyOnProperty(authService,'userID', 'get').and.returnValue('MOCK-USER-ID-1');

    spyOn(getEventInfoService, 'getEventTitle').and.stub().and.returnValue(of({
      eventTitle: 'MOCK-EVENT-1'
    }));

    spyOn(getSeatInfoService, 'getSeatCategories').and.stub().and.returnValue(of([{categoryId: "CAT-A", price: "320"}, {categoryId: "CAT-B", price: "300"}]));

    fixture = TestBed.createComponent(CategoryPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('event title should be MOCK-EVENT-1', () => {
    expect(component.eventTitle).toEqual('MOCK-EVENT-1');
  });

  it('event categories should be correctly set', () =>{
    let seatCategories: Array<any> = new Array<any>([{categoryId: "CAT-A", price: "320"}, {categoryId: "CAT-B", price: "300"}]);
    expect(getSeatInfoService.getSeatCategories).toHaveBeenCalled();
  });

  it('should log out the user when handleBack is clicked', () => {
    const emailSpy = spyOnProperty(authService, 'email', 'set').and.stub();
    const userSpy = spyOnProperty(authService, 'user', 'set').and.stub();
    const userIDSpy = spyOnProperty(authService, 'userID', 'set').and.stub();
    const routerSpy = spyOn(router, 'navigate').and.stub();

    component.handleBack();

    expect(emailSpy).toHaveBeenCalledWith(undefined);
    expect(userSpy).toHaveBeenCalledWith(undefined);
    expect(userIDSpy).toHaveBeenCalledWith(undefined);
    expect(routerSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should open the PurchaseCategoriesPopup when info icon is clicked', () => {
    const activeModalSpy = spyOn(activeModal, 'open').and.stub();
    component.handleInformationClick();
    expect(activeModalSpy).toHaveBeenCalledWith(PurchaseCategoriesPopupComponent, {centered: true});
  });

  it('should turn the seating plan on and off', () => {
    let initialSeatingPlanState: boolean = component.showSeatingPlan;
    component.toggleSeatingPlan();
    expect(component.showSeatingPlan).toEqual(!initialSeatingPlanState);
  });

  it('should save seat choices and route to confirmation page', () => {
    spyOn(getSeatInfoService, 'submitSeatChoices').and.stub().and.returnValue(of(true));
    spyOn(router, 'navigate').and.stub();
    component.selectedCategory = 'MOCK-SELECTED-CAT-1';

    component.handleNext();
    expect(getSeatInfoService.submitSeatChoices).toHaveBeenCalledWith('MOCK-GROUP-ID-1', 'MOCK-EVENT-ID-1', 'MOCK-SHOW-ID-1', 'MOCK-USER-ID-1', 'MOCK-SELECTED-CAT-1');
    expect(router.navigate).toHaveBeenCalledWith(['/purchase/confirmation', 'MOCK-SELECTED-CAT-1']);
  });
});
