import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GetUserInfoService } from 'src/app/shared/services/get-user-info/get-user-info.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { IpServiceService } from 'src/app/core/services/ip-service/ip-service.service';

@Component({
  selector: 'app-secure-login',
  templateUrl: './secure-login.component.html',
  styleUrls: ['./secure-login.component.scss']
})
export class SecureLoginComponent implements OnInit {

  loginFG: FormGroup;
  emailFC: FormControl = new FormControl('', []);
  mobileFC: FormControl = new FormControl('', []);
  passwordFC: FormControl = new FormControl('', []);
  checkboxFC: FormControl = new FormControl(false);

  showInvalidLoginMessage: boolean = false;

  isLoginSuccessful: boolean = false;
  dataValue: string | boolean | undefined = undefined;
  ipAddress: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private getUserInfoService: GetUserInfoService,
    private ip: IpServiceService
  ){
    this.loginFG = this.fb.group({
      email: this.emailFC,
      mobile: this.mobileFC,
      password: this.passwordFC,
      checkbox: this.checkboxFC,
    });
  }

  ngOnInit(): void {
    this.isLoginSuccessful = false;
    this.dataValue = undefined;
    this.showInvalidLoginMessage = false;
    this.getIP();
  }

  getIP() {
    this.ip.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
    })
  }

  handleLoginClick(){
    if (!this._fieldsAllValid()) return;
    // let email: string = "jrteo.2022@smu.edu.sg";
    // let mobile: string = "06598231539";
    // let password: string = "test123";
    let mobile = this.processMobile();
    this.authService.login(this.emailFC.value, mobile, this.passwordFC.value, this.ipAddress).subscribe(
      (data: string | boolean) => {
        if (typeof data === 'string' && data !== 'false') {
          this.authService.saveAuthToken(data.toString()); // save JWT Token to browser local storage.
          // this.isLoginSuccessful = true;

          this.getUserInfoService.loadUserInfo(this.emailFC.value).subscribe(
            (data: any) => {
              const user: User = {
                userID : data.id,
                mobileNo: data.mobile,
                email : data.email,
                authenticatorID: data.authenticatorId,
                isVerified: data.verified
              };
              console.log(user);

              this.authService.user = user;
              // Authenticate user
              this.authService.authenticateUser().then((data: boolean) => {
                // Log in user
                this.isLoginSuccessful = true;
                console.log(this.isLoginSuccessful);
                this.authService.email = this.emailFC.value;
              });
            }
          );
        } else {
          this.showInvalidLoginMessage = true;
        } 

        if (this.isLoginSuccessful) {
          this.router.navigate(['purchase/categories']);
        }
        this.dataValue = data;
      }
    )
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

  private processMobile(): string {
    let mobile: string = this.mobileFC.value;
    mobile = mobile.replace('+', '0');
    return mobile;
  }
}
