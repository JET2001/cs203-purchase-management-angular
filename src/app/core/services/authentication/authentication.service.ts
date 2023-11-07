import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseRestApiService } from '../base-rest-api/base-rest-api.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { baseURL } from '../../constants/api-paths';
import { User } from 'src/app/models/user';
// import { GaVerificationPopupComponent } from 'src/app/shared/components/ga-verification-popup/ga-verification-popup.component';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseRestApiService {
  private _userID: string | undefined = undefined;
  private _email: string | undefined = undefined;

  private _userObject: User | undefined = undefined;

  private _emailSubject: BehaviorSubject<string | undefined> =
    new BehaviorSubject(this._email);
  public email$: Observable<string | undefined> =
    this._emailSubject.asObservable();

  constructor(
    private activeModal: NgbModal,
    private localStorageService: LocalStorageService,
    protected override http: HttpClient
  ) {
    super(http);
  }

  public get user(): User | undefined {
    return this._userObject;
  }

  public set user(user: User | undefined) {
    this._userObject = user;
  }

  public get emailSubject(): BehaviorSubject<string | undefined> {
    return this._emailSubject;
  }
  // userIDSubject : BehaviorSubject<string | undefined> = new B
  public get userID(): string | undefined {
    return this._userID;
  }

  public set userID(userID: string | undefined) {
    this._userID = userID;
  }
  public get isLoggedIn(): boolean {
    console.log(this._userObject);
    console.log(this.localStorageService.userToken);
    return (
      this._userObject != undefined &&
      this.localStorageService.userToken != null
    );
  }
  public get isVerified(): boolean {
    return this._userObject != undefined ? this._userObject.isVerified : false;
  }

  public saveAuthToken(authToken: string) {
    this.localStorageService.userToken = authToken;
  }

  public get retrieveAuthToken(): string | null {
    return this.localStorageService.userToken;
  }

  public login(
    email: string,
    mobile: string,
    password: string,
    ipAddress: string
  ): Observable<any> {
    return this.post('auth/login', {
      email: email,
      mobile: mobile,
      password: password,
      ipAddress: ipAddress,
    });
  }

  // We must modify the responseType and headers in order to use the login API.
  protected override post(path: string, data: any): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders({
      // 'Content-Type': 'application/json',
      email: data.email,
      mobile: data.mobile,
      password: data.password,
      // "ipAddress": "172.128.0.1"
      ipAddress: data.ipAddress,
    });
    // console.log("auth headers =" + headers.get('email') + " " + headers.get('mobile') + " " + headers.get('password'));
    // headers.set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.post(
      `${baseURL}/${path}`,
      {},
      {
        headers,
        responseType: 'text',
      }
    );
  }

  public get email(): string | undefined {
    return this._email;
  }

  public set email(email: string | undefined) {
    this._email = email;
    this._emailSubject.next(this._email);
  }

  public authenticateUser(): Promise<boolean> {
    // this.activeModal.open(GaVerificationPopupComponent, { centered: true });
    return Promise.resolve(true);
  }
}
