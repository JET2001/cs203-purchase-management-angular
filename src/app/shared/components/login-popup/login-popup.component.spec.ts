import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPopupComponent } from './login-popup.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InputFieldComponent } from '../input-field/input-field.component';
import { TextButtonComponent } from '../text-button/text-button.component';
import { SharedModule } from '../../shared.module';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { GetUserInfoService } from '../../services/get-user-info/get-user-info.service';
import { IpServiceService } from 'src/app/core/services/ip-service/ip-service.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { of, throwError } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { MessageService } from 'primeng/api';
import { BaseComponent } from 'src/app/base/base.component';

class FakeComponent extends BaseComponent {
  public groupid: string = 'MOCK-GROUP-1';
  public eventid: string = 'MOCK-EVENT-1';
  public queueid: string = 'MOCK-QUEUE-1';
}

describe('LoginPopupComponent', () => {
  let component: LoginPopupComponent;
  let fixture: ComponentFixture<LoginPopupComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let getUserInfoService: GetUserInfoService;
  let authService: AuthenticationService;
  let parentHeaderComponent: HeaderComponent;
  let ip: IpServiceService;
  let route: ActivatedRoute;
  let parentComponent: BaseComponent;
  const fakeActivatedRoute = {
    snapshot: {
      paramMap: {
        keys: ['groupid', 'eventid', 'queueid', 'showid'],
      },
    },
  } as ActivatedRoute;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPopupComponent],
      imports: [SharedModule, HttpClientTestingModule],
      providers: [
        NgbActiveModal,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        FakeComponent,
      ],
    }).compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(LoginPopupComponent);
    getUserInfoService = TestBed.inject(GetUserInfoService);
    ip = TestBed.inject(IpServiceService);
    route = TestBed.inject(ActivatedRoute);
    authService = TestBed.inject(AuthenticationService);
    parentComponent = TestBed.inject(FakeComponent);
    component = fixture.componentInstance;
    component.fromParent = parentComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login the user with the right parameters', () => {
    spyOn(authService, 'login').and.stub().and.returnValue(of('MOCK-TOKEN-1'));
    // spyOnProperty(authService, 'user', 'set').and.stub();
    // spyOnProperty(authService, 'email', 'set').and.stub();
    // spyOnProperty(authService, 'userID', 'set').and.stub();

    component.emailFC.setValue('MOCK-USER-EMAIL@example.com');
    component.mobileFC.setValue('+6590000000');
    component.passwordFC.setValue('MOCK-PW-1');
    component.loginUser();

    expect(authService.login).toHaveBeenCalledWith(
      'MOCK-USER-EMAIL@example.com',
      '06590000000',
      'MOCK-PW-1',
      '172.17.0.2',
      'MOCK-GROUP-1',
      'MOCK-EVENT-1',
      'MOCK-QUEUE-1'
    );
  });

  it('should save the user, email and userID upon successful login', () => {
    spyOn(authService, 'login').and.returnValue(of('MOCK-TOKEN-1'));
    spyOn(getUserInfoService, 'loadUserInfo').and.returnValue(
      of(
        '{"id": "MOCK-USER-1","mobile":"06590000000", "email":"MOCK-USER-EMAIL@example.com", "authenticatorId", "isVerified": true}'
      )
    );
    const userSpy = spyOnProperty(authService, 'user', 'set').and.stub();
    const emailSpy = spyOnProperty(authService, 'email', 'set').and.stub();
    const userIDSpy = spyOnProperty(authService, 'userID', 'set').and.stub();
    const authTokenSpy = spyOn(authService, 'saveAuthToken').and.stub();

    component.emailFC.setValue('MOCK-USER-EMAIL@example.com');
    component.mobileFC.setValue('+6590000000');
    component.passwordFC.setValue('MOCK-PW-1');

    component.loginUser();
    expect(getUserInfoService.loadUserInfo).toHaveBeenCalledWith(
      'MOCK-USER-EMAIL@example.com'
    );
    expect(userSpy).toHaveBeenCalled();
    expect(emailSpy).toHaveBeenCalled();
    expect(userIDSpy).toHaveBeenCalled();
    expect(authTokenSpy).toHaveBeenCalled();
  });

  it('should show an invalid login message if login is unsuccessful', () => {
    spyOn(authService, 'login').and.returnValue(
      throwError(() => new HttpErrorResponse({ status: 500 }))
    );
    spyOn(component, 'spinnerHide').and.stub();
    component.emailFC.setValue('MOCK-USER-EMAIL@example.com');
    component.mobileFC.setValue('+6590000000');
    component.passwordFC.setValue('MOCK-PW-1');

    component.loginUser();

    expect(component.showInvalidLoginMessage).toBeTrue();
    expect(component.spinnerHide).toHaveBeenCalled();
  });

  it('should not call authservice if the login fields are invalid', () => {
    spyOn(authService, 'login').and.returnValue(
      throwError(() => new HttpErrorResponse({ status: 500 }))
    );
    component.emailFC.setValue('MOCK-USER-EMAIL@example.com');
    component.mobileFC.setValue('+6590000000');
    // Missing password
    component.loginUser();
    expect(authService.login).toHaveBeenCalledTimes(0);
  });
});
