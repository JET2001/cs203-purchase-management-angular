import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PurchaseConfirmationComponent } from './purchase-confirmation.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { TextButtonComponent } from 'src/app/shared/components/text-button/text-button.component';
import { GetGroupInfoService } from 'src/app/shared/services/get-group-info/get-group-info.service';
import { GetSeatInfoService } from 'src/app/shared/services/get-seat-info/get-seat-info.service';
import { GetEventInfoService } from 'src/app/shared/services/get-event-info/get-event.info.service';
import { of } from 'rxjs';

describe('PurchaseConfirmationComponent', () => {
  let component: PurchaseConfirmationComponent;
  let fixture: ComponentFixture<PurchaseConfirmationComponent>;
  let router: Router;
  let getGroupInfoService: GetGroupInfoService;
  let getSeatInfoService: GetSeatInfoService;
  let getEventInfoService: GetEventInfoService;

  const fakeActivatedRoute = {
    snapshot: {
      data: {},
    },
  } as ActivatedRoute;
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseConfirmationComponent, HeaderComponent, TextButtonComponent],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    }).compileComponents();

    getGroupInfoService = TestBed.inject(GetGroupInfoService);
    getEventInfoService = TestBed.inject(GetEventInfoService);
    getSeatInfoService = TestBed.inject(GetSeatInfoService);
    router = TestBed.inject(Router);

    spyOn(getGroupInfoService, 'getGroupSize').and.returnValue(of(2));
    spyOn(getEventInfoService, 'getEventTitle').and.returnValue(of({
      eventTitle: 'MOCK-EVENT-1'
    }));
    fixture = TestBed.createComponent(PurchaseConfirmationComponent); //async ngOnInit
    component = fixture.componentInstance;
    fixture.detectChanges();

    console.log(component.eventTitle);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a groupsize of 2', () => {
    expect(component.groupSize).toEqual(2);
  })

  it('should have an event title of "MOCK-EVENT-1"', () => {
    // tick(5000);
    expect(component.eventTitle).toEqual('MOCK-EVENT-1');
  });

  it('should route to login when handleFeedback is clicked' , () =>{
    spyOn(router, 'navigate').and.stub();
    component.handleFeedback();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  })

});
