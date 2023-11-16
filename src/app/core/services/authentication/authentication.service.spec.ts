import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHandler,
} from '@angular/common/http';
import { User } from 'src/app/models/user';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { of, throwError, BehaviorSubject, Observable } from 'rxjs';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let localStorageService: LocalStorageService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    });
    service = TestBed.inject(AuthenticationService);
    localStorageService = TestBed.inject(LocalStorageService);
    http = TestBed.inject(HttpClient);
    localStorageService.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve and save a new user object', () => {
    expect(service.user).toBeUndefined();
    expect(service.isLoggedIn).toBeFalse();
    const user: User = {
      userID: 'FAKE-USERID-1',
      mobileNo: '+6590000000',
      email: 'FAKE_EMAIL@gmail.com',
      isVerified: false,
    };

    service.user = user;
    expect(service.user).toEqual(user);
  });

  it('should get the right user credentials', () => {
    const user: User = {
      userID: 'FAKE-USERID-1',
      mobileNo: '+6590000000',
      email: 'FAKE_EMAIL@gmail.com',
      isVerified: false,
    };
    service.user = user;
    expect(service.userID).toEqual('FAKE-USERID-1');
    expect(service.isVerified).toBeFalse();
  });

  it('user should not be able to login with only the userID', () => {
    const user: User = {
      userID: 'FAKE-USERID-1',
      mobileNo: '+6590000000',
      email: 'FAKE_EMAIL@gmail.com',
      isVerified: false,
    };
    service.user = user;
    expect(service.isLoggedIn).toBeFalse();
  });

  it('should save the auth token', () => {
    expect(service.retrieveAuthToken).toBeNull();
    // spyOnProperty(localStorageService, 'userToken').and.stub();
    service.saveAuthToken('MOCK-AUTH-TOKEN');

    expect(localStorageService.userToken).toBe('MOCK-AUTH-TOKEN');
    localStorageService.reset();
  });

  it('logged in with only token is considered invalid', () => {
    spyOnProperty(localStorageService, 'userToken').and.returnValue(
      'MOCK-TOKEN-1'
    );
    expect(service.isLoggedIn).toBeFalse();
  });

  it('user can login', () => {
    spyOn(http, 'post').and.returnValue(of('MOCK-JWT-TOKEN-1'));
    service.login('', '', '', '', '', '', '').subscribe(
      (data: string) => {
        expect(data).toEqual('MOCK-JWT-TOKEN-1');
      },
      (error: HttpErrorResponse) => {
        fail('We should expect a JWT Token and not an error');
      }
    );
  });

  it('user cannot login', () => {
    spyOn(http, 'post').and.returnValue(
      throwError(() => new HttpErrorResponse({ status: 400 }))
    );
    service.login('', '', '', '', '', '', '').subscribe(
      (data: string) => {
        fail('Login should fail');
      },
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(400);
      }
    );
  });

  it('should get and set the user email', () => {
    expect(service.email).toBeUndefined();
    service.email = 'NEW-EMAIL-1';
    expect(service.email).toEqual('NEW-EMAIL-1');
  });

  it('should get and set the userID', () => {
    expect(service.userID).toBeUndefined();
    service.userID = 'NEW-USERID-1';
    expect(service.userID).toEqual('NEW-USERID-1');
  });

  it('should get the emailSubject', () => {
    expect(service.emailSubject).toBeTruthy();
  });

  it('should not be verified if the userObject is undefined', () => {
    expect(service.user).toBeUndefined();
    expect(service.isVerified).toBeFalse();
  });

  // it('retrieves and sets the email', () => {
  //   let subject : BehaviorSubject<string | undefined> = service.emailSubject;
  //   let email$: Observable<string|undefined> = subject.asObservable();
  //   email$.subscribe(
  //     (data: string | undefined) => {
  //       expect(data).toEqual("NEW_USER_EMAIL");
  //     },
  //     (error: Error) => {
  //       fail("Should not throw an error");
  //     }
  //   );
  //   service.email = "NEW_USER_EMAIL";

  // });
});
