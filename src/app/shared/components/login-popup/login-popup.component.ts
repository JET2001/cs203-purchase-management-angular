import { BaseComponent } from 'src/app/base/base.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { GetUserInfoService } from '../../services/get-user-info/get-user-info.service';
import { User } from 'src/app/models/user';
import { IpServiceService } from 'src/app/core/services/ip-service/ip-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { from, queue } from 'rxjs';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss'],
})
export class LoginPopupComponent extends BaseComponent implements OnInit {
  loginFG: FormGroup;
  emailFC: FormControl = new FormControl('', []);
  mobileFC: FormControl = new FormControl('', []);
  passwordFC: FormControl = new FormControl('', []);
  checkboxFC: FormControl = new FormControl(false);
  ipAddress: string;
  navigateUser: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  @Input() fromParent: any;

  // Error message fields
  showInvalidLoginMessage: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private getUserInfoService: GetUserInfoService,
    private ip: IpServiceService,
    private route: ActivatedRoute,
    protected override spinner: NgxSpinnerService
  ) {
    super(spinner);
    this.loginFG = this.fb.group({
      email: this.emailFC,
      mobile: this.mobileFC,
      password: this.passwordFC,
      checkbox: this.checkboxFC,
    });
  }

  ngOnInit(): void {
    this.getIP();
  }

  getIP(): void {
    this.ip.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
    });
  }

  loginUser(): void {
    if (!this._fieldsAllValid()) return;
    // Process mobile number
    this.spinnerShow();

    let mobile = this.processMobile();
    let email = this.emailFC.value;
    // const groupid = this.route.snapshot.paramMap.get('groupid')!;
    // const eventid = this.route.snapshot.paramMap.get('eventid')!;
    // const queueid = this.route.snapshot.paramMap.get('queueid')!;
    const groupid = this.fromParent.groupid;
    const eventid = this.fromParent.eventid;
    const queueid = this.fromParent.queueid;
    console.log(groupid)
    console.log(eventid)
    console.log(queueid)
    this.authService
      .login(
        this.emailFC.value,
        mobile,
        this.passwordFC.value,
        this.ipAddress,
        groupid,
        eventid,
        queueid
      )
      .subscribe({
        next: (token: string) => {
          // User gets a JWT token
          console.log(token);
          if (token !== 'false') {
            this.authService.saveAuthToken(JSON.parse(JSON.stringify(token)));

            // Make another call to get the user object --> quite inefficient for now. But possibly can refactor.
            this.getUserInfoService
              .loadUserInfo(email)
              .subscribe((data: any) => {
                console.log(data);
                const user: User = {
                  userID: data.id,
                  mobileNo: data.mobile,
                  email: data.email,
                  authenticatorID: data.authenticatorId,
                  isVerified: data.verified,
                };

                this.authService.user = user;
                // Authenticate user
                this.authService.authenticateUser().then((data: boolean) => {
                  // Log in user
                  this.authService.email = email;

                  this.navigateUser.emit(true);
                });

                this.loginFG.reset();
                // Dismiss this active modal
                this.spinnerHide();
                this.activeModal.dismiss();
              });
          }
        },
        error: (error) => {
          this.showInvalidLoginMessage = true;
          // if (error.message)
          this.spinnerHide();
        },
      });
  }

  private _fieldsAllValid(): boolean {
    for (let value of [
      this.emailFC.value,
      this.mobileFC.value,
      this.passwordFC.value,
    ]) {
      if (value == null || value == undefined || value == '') {
        this.showInvalidLoginMessage = true;
        return false;
      }
    }
    this.showInvalidLoginMessage = false;
    return true;
  }

  // Hide error message when fields are modified
  private _fieldsAreModified(): void {
    for (let fc of [this.emailFC, this.mobileFC, this.passwordFC]) {
      if (fc.dirty) this.showInvalidLoginMessage = false;
    }
  }

  private processMobile(): string {
    let mobile: string = this.mobileFC.value;
    mobile = mobile.replace('+', '0');
    return mobile;
  }
}
