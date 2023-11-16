import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureLoginComponent } from './secure-login.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { GetEventInfoService } from 'src/app/shared/services/get-event-info/get-event.info.service';
import { GetGroupInfoService } from 'src/app/shared/services/get-group-info/get-group-info.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { IpServiceService } from 'src/app/core/services/ip-service/ip-service.service';
import { of } from 'rxjs';
import { TextButtonComponent } from 'src/app/shared/components/text-button/text-button.component';
import { LoginPopupComponent } from 'src/app/shared/components/login-popup/login-popup.component';
import { InputFieldComponent } from 'src/app/shared/components/input-field/input-field.component';
import { EventEmitter } from '@angular/core';

describe('SecureLoginComponent', () => {
  let component: SecureLoginComponent;
  let fixture: ComponentFixture<SecureLoginComponent>;
  let route: ActivatedRoute;
  let getEventInfoService: GetEventInfoService;
  let getGroupInfoService: GetGroupInfoService;
  let activeModal: NgbModal;
  let authService: AuthenticationService;
  let ipService: IpServiceService;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let loginPopupComponent: LoginPopupComponent;

  const fakeActivatedRoute = {
    snapshot: {
      paramMap: convertToParamMap({ 'groupid': 'MOCK-GROUP-0', 'eventid': 'MOCK-EVENT-1', 'queueid': 'MOCK-QUEUE-1', 'showid': 'MOCK-SHOW-1'})
    }
  } as ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecureLoginComponent, HeaderComponent, TextButtonComponent, LoginPopupComponent, InputFieldComponent],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        LoginPopupComponent,
        NgbActiveModal,
      ],
    }).compileComponents();
    loginPopupComponent = TestBed.inject(LoginPopupComponent);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    spyOn(activatedRoute.snapshot.paramMap, 'get').and.returnValue('MOCK-EVENT-0');
    // spyOn(loginPopupComponent, 'navigateUser').and.returnValue(new EventEmitter<Boolean>(true));
    spyOn(router, 'navigate').and.stub();

    fixture = TestBed.createComponent(SecureLoginComponent);
    component = fixture.componentInstance;

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // fit('should route to the queue/room upon success', () => {
  //   expect(router.navigate).toHaveBeenCalledWith(['queue','room']);
  // });
});
