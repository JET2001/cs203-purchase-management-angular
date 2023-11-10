import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPopupComponent } from './login-popup.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InputFieldComponent } from '../input-field/input-field.component';
import { TextButtonComponent } from '../text-button/text-button.component';
import { SharedModule } from '../../shared.module';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ActivatedRoute, UrlSegment } from '@angular/router';

describe('LoginPopupComponent', () => {
  let component: LoginPopupComponent;
  let fixture: ComponentFixture<LoginPopupComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const fakeActivatedRoute = {
    snapshot: {
      url: [new UrlSegment("login", {}), new UrlSegment("MOCK_GROUPID_0", {"groupid"}), new UrlSegment("MOCK_EVENTID_0", {}), new UrlSegment("MOCK_SHOWID_1", {}), new UrlSegment("MOCK_QUEUEID_0", {})],
      paramMap: {
        keys: ['groupid', 'eventid', 'queueid', 'showid'],
      }
    },
  } as ActivatedRoute;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPopupComponent],
      imports: [SharedModule, HttpClientTestingModule],
      providers: [
        NgbActiveModal,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    }).compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(LoginPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
