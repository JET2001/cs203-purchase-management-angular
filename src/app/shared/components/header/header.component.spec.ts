import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TextButtonComponent } from '../text-button/text-button.component';
import { HeaderComponent } from './header.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let activeModal: NgbModal;
  let authService: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, TextButtonComponent],
      imports: [HttpClientTestingModule],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    activeModal = TestBed.inject(NgbModal);
    authService = TestBed.inject(AuthenticationService);

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the loginPopupCompoentn when loginbutton is clicked', () => {
    spyOn(activeModal, 'open').and.stub();
    component.handleLoginButtonClick();
    expect(activeModal.open).toHaveBeenCalledWith(LoginPopupComponent, {centered:true});
  });

});
